<?php

namespace App\Http\Controllers\Admin;

use App\Filters\Admin\PaymentFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Payments\PaymentRequest;
use App\Http\Requests\Admin\Payments\PaymentUpdateRequest;
use App\Http\Resources\Admin\Payments\PaymentCollection;
use App\Http\Resources\Admin\Payments\PaymentResource;
use App\Models\Inventory;
use App\Models\OutboundInvoice;
use App\Models\OutboundInvoiceDetail;
use App\Models\Payment;
use App\Models\PaymentProducts;
use App\Models\Product;
use App\Models\Promotion;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Kra8\Snowflake\Snowflake;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filter = new PaymentFilter();
            $queryResult = $filter->transform($request);
            $queryItems = $queryResult['filter'];
            $sorts = $queryResult['sorts'];
            $perPage = $request->query('per_page', 5);
            if ($perPage < 1 || $perPage > 100) {
                $perPage = 5;
            }

            $selectedColumns = ['*'];

            $query = Payment::select($selectedColumns)->where($queryItems);
            if ($request['search']) {
                $value = $request['search'];

                $query->where('id', 'like', '%' . $value . '%')
                    ->orWhere('appointment_id', 'like', '%' . $value . '%')
                    ->orWhere('status', 'like', '%' . $value . '%');
            }

            $query = $query->orderBy($sorts[0], $sorts[1]);
            if (count($query->paginate($perPage)) == 0) {
                return response()->json([
                    "status" => true,
                    "message" => "Không tìm thấy dữ liệu tương ứng"
                ], 200);
            }
            return new PaymentCollection($query->paginate($perPage)->appends($request->query()));
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
            ];
            return response()->json($arr, 500);
        }
    }

    public function store(PaymentRequest $request)
    {
        DB::beginTransaction();
        $products_out_of_stock = [];

        $validateData = $request->validated();
        if ($validateData['products'] != null || $validateData['products'] != []) {
            foreach ($validateData['products'] as $product) {
                $inventory = Inventory::where('product_id', $product['product_id'])->orderBy('created_at', 'DESC')->first();
                if (!$inventory || $inventory->quantity <= 0 || $inventory->quantity < $product['quantity']) {
                    DB::rollBack();
                    return response()->json([
                        "status" => "error",
                        "message" => "Hết hàng trong kho.",
                        'error' => 'Số lượng sản phẩm mã: ' . (string) $product['product_id'] . ' trong kho không đáp ứng đc yêu cầu.'
                    ], 400);
                }
                array_push($products_out_of_stock, [
                    'product_id' => $product['product_id'],
                    'quantity' => $product['quantity'],
                ]);
            }
            $product_total = 0;
            $service_total = 0;
            $subtotal = 0;
            $reduce = 0;
            $total_amount = 0;
            //them moi payment
            $payment = Payment::create([
                'id' => $validateData['id'],
                'service_total' => 0,
                'product_total' => 0,
                'subtotal' => 0,
                'total_amount' => 0,
                'status' => 0,
                'payment_type' => $validateData['payment_type'],
                'created_by' => auth('api')->user()->id,
            ]);
            $payment_Id = $payment->id;

            //them products payment
            foreach ($validateData['products'] as $product) {
                $pr = Product::find($product['product_id']);
                $total_price = $pr->price * $product['quantity'];
                $payment_products = PaymentProducts::create([
                    'id' => app(Snowflake::class)->next(),
                    'product_id' => $pr->id,
                    'payment_id' => $payment_Id,
                    'quantity' => $product['quantity'],
                    'unit_price' => $pr->price,
                    'total_price' => $pr->price * $product['quantity'],
                ]);
                $product_total += $total_price;
            }
            $subtotal = $product_total + $service_total;

            //xu ly khi co ma giam
            $promotionId = null;
            if ($validateData['promotion_name']) {
                $currentDateTime = Carbon::now()->format('Y-m-d H:i:s');
                $promotion = Promotion::where('name', 'like', '%' . $validateData['promotion_name'] . '%')->where('start_date', '<=', $currentDateTime)->where('end_date', '>=', $currentDateTime)->where('status', 1)->where('min_quantity', '<=', count($products_out_of_stock))->where('min_order_amount', '<=', $subtotal)->first();

                if ($promotion) {
                    $promotionId = $promotion->id;
                    if ($promotion->promotion_type == 1 || $promotion->promotion_type == 'Percent') {
                        $reduce = ($subtotal * ($promotion->discount_percent / 100));
                    } else {
                        $reduce = $promotion->discount_percent;
                    }
                    $total_amount = $subtotal - $reduce;
                    ($total_amount < 0) ? $total_amount = 0 : $total_amount;
                }

            }

            $payment->update([
                'promotion_id' => $promotionId,
                'product_total' => $product_total,
                'reduce' => $reduce,
                'subtotal' => $subtotal,
                'total_amount' => (($subtotal - $reduce) < 0) ? 0 : $subtotal - $reduce,
            ]);
            DB::commit();

            $response = [
                'status' => 'success',
                'message' => 'Thêm mới hóa đơn thành công.',
                'data' => new PaymentResource($payment)
            ];
            return response()->json($response);
        }

        $response = [
            'status' => 'false',
            'message' => 'Thêm mới hóa đơn không thành công.'
        ];
        return response()->json($response);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $query = Payment::query();

            $payment = $query->find($id);
            if (!$payment) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            $arr = [
                'status' => 'success',
                'message' => 'Chi tiết hóa đơn. ',
                'data' => new PaymentResource($payment)
            ];
            return response()->json($arr);
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình xử lý.',
            ];
            return response()->json($arr, 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PaymentUpdateRequest $request, string $id)
    {
        DB::beginTransaction();
        $validateData = $request->validated();
        $payment = Payment::find($id);
        if (!$payment) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy dữ liệu',
            ], 404);
        }
        if ($payment->status == 1) {
            return response()->json([
                'status' => 'true',
                'message' => 'Không thể chỉnh sửa do thanh toán đã hoàn thành.'
            ], status: 200);
        }
        PaymentProducts::where('payment_id', $payment->id)->delete();

        if ($validateData['products'] != null || $validateData['products'] != []) {
            PaymentProducts::where('payment_id', $payment->id)->delete();
            foreach ($validateData['products'] as $product) {
                $inventory = Inventory::where('product_id', $product['product_id'])->orderBy('created_at', 'DESC')->first();
                if (!$inventory || $inventory->quantity <= 0 || $inventory->quantity < $product['quantity']) {
                    DB::rollBack();
                    return response()->json([
                        "status" => "error",
                        "message" => "Hết hàng trong kho.",
                        'error' => 'Số lượng sản phẩm mã: ' . (string) $product['product_id'] . ' trong kho không đáp ứng đc yêu cầu.'
                    ], 400);
                }
            }
        }
        $product_total = 0;
        $service_total = $payment->service_total;
        $subtotal = 0;
        $reduce = 0;
        $total_amount = 0;
        $payment_Id = $payment->id;
        //them products payment
        foreach ($validateData['products'] as $product) {
            $pr = Product::find($product['product_id']);
            $total_price = $pr->price * $product['quantity'];
            $payment_products = PaymentProducts::create([
                'id' => app(Snowflake::class)->next(),
                'product_id' => $pr->id,
                'payment_id' => $payment_Id,
                'quantity' => $product['quantity'],
                'unit_price' => $pr->price,
                'total_price' => $pr->price * $product['quantity'],
            ]);
            $product_total += $total_price;
        }
        $subtotal = $product_total + $service_total;

        //xu ly khi co ma giam
        $promotionId = null;
        if ($validateData['promotion_name']) {
            $currentDateTime = Carbon::now()->format('Y-m-d H:i:s');
            $promotion = Promotion::where('name', 'like', '%' . $validateData['promotion_name'] . '%')->where('start_date', '<=', $currentDateTime)->where('end_date', '>=', $currentDateTime)->where('status', 1)->where('min_quantity', '<=', count($validateData['products']))->where('min_order_amount', '<=', $subtotal)->first();

            if ($promotion) {
                $promotionId = $promotion->id;
                if ($promotion->promotion_type == 1 || $promotion->promotion_type == 'Percent') {
                    $reduce = ($subtotal * ($promotion->discount_percent / 100));
                } else {
                    $reduce = $promotion->discount_percent;
                }
                $total_amount = $subtotal - $reduce;
                ($total_amount < 0) ? $total_amount = 0 : $total_amount;
            }

        }

        $payment->update([
            'payment_type' => $validateData['payment_type'],
            'status' => $validateData['status'],
            'promotion_id' => $promotionId,
            'product_total' => $product_total,
            'reduce' => $reduce,
            'subtotal' => $subtotal,
            'total_amount' => (($subtotal - $reduce) < 0) ? 0 : $subtotal - $reduce,
        ]);
        if (count($validateData['products']) > 0) {
            if ($payment->status == 1 || $validateData['status'] == 1) {
                $outbountInvoice = OutboundInvoice::create([
                    'id' => app(Snowflake::class)->next(),
                    'staff_id' => auth('api')->user()->id,
                    'note' => 'Bán trong hóa đơn: ' . $payment->id,
                    'outbound_invoice_type' => 'service',
                    'total_amount' => 0
                ]);
                $tongxuat = 0;
                foreach ($validateData['products'] as $product) {
                    $inventory = Inventory::where('product_id', $product['product_id'])->orderBy('created_at', 'DESC')->first();
                    if (!$inventory || $inventory->quantity <= 0 || $inventory->quantity < $product['quantity']) {
                        DB::rollBack();
                        return response()->json([
                            "status" => "error",
                            "message" => "Hết hàng trong kho.",
                            'error' => 'Số lượng sản phẩm mã: ' . (string) $product['product_id'] . ' trong kho không đáp ứng đc yêu cầu.'
                        ], 400);
                    }

                    $pr = Product::find($product['product_id']);

                    $outbountInvoiceDetail = OutboundInvoiceDetail::create([
                        'id' => app(Snowflake::class)->next(),
                        'product_id' => $product['product_id'],
                        'outbound_invoice_id' => $outbountInvoice->id,
                        'quantity_export' => $product['quantity'],
                        'quantity_olded' => $inventory->quantity,
                        'unit_price' => $pr->price
                    ]);

                    $tongxuat += $outbountInvoiceDetail->quantity_export * $outbountInvoiceDetail->unit_price;


                    //Cap nhat moi cho ton kho
                    $updateInventory = Inventory::create([
                        'id' => app(Snowflake::class)->next(),
                        'product_id' => $product['product_id'],
                        'quantity' => $inventory->quantity - $product['quantity'],
                        'created_by' => auth('api')->user()->id,
                        'updated_by' => auth('api')->user()->id,
                    ]);
                }
                //cap nhat hoa don
                $outbountInvoice->update([
                    'total_amount' => $tongxuat,
                ]);

            }
        }
        DB::commit();

        $response = [
            'status' => 'success',
            'message' => $payment->status == 1 ? 'Tiến hành thanh toán.' : 'Chỉnh sửa hóa đơn thành công.',
            'data' => new PaymentResource($payment)
        ];
        return response()->json($response);

        // } else {
        //     $response = [
        //         'status' => 'success',
        //         'message' => 'Chỉnh sửa hóa đơn không thành công.',
        //         'data' => new PaymentResource($payment)
        //     ];
        //     return response()->json($response);
        // }
    }
}
