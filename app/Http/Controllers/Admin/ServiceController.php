<?php

namespace App\Http\Controllers\Admin;

use App\Filters\Admin\ServiceFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Services\ServiceProductsRequest;
use App\Http\Requests\Admin\Services\ServiceProductsUpdateRequest;
use App\Http\Requests\Admin\Services\ServiceRequest;
use App\Http\Requests\Admin\Services\ServiceUpdateRequest;
use App\Http\Resources\Admin\Services\ServiceCollection;
use App\Http\Resources\Admin\Services\ServiceResource;
use App\Models\ProductService;
use App\Models\Service;
use App\Models\ServiceImage;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Kra8\Snowflake\Snowflake;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filter = new ServiceFilter();
            $queryResult = $filter->transform($request);
            $queryItems = $queryResult['filter'];
            $sorts = $queryResult['sorts'];
            $perPage = $request->query('per_page', 5);
            if ($perPage < 1 || $perPage > 100) {
                $perPage = 5;
            }

            $selectedColumns = ['id', 'name', 'price', 'service_category_id', 'status', 'duration'];
            $query = Service::select($selectedColumns)->where($queryItems);

            if ($request['search']) {
                $value = $request['search'];
                $query->whereHas('serviceCategory', function (Builder $query) use ($value) {
                    $query->where('name', 'like', '%' . $value . '%');
                })
                    ->orWhere('name', 'like', '%' . $value . '%')
                    ->orWhere('id', 'like', '%' . $value . '%')
                ;
            }
            if ($sorts) {
                $query = $query->orderBy($sorts[0], $sorts[1]);
            }
            if (count($query->paginate($perPage)) == 0) {
                return response()->json([
                    "status" => true,
                    "message" => "Không tìm thấy dữ liệu tương ứng"
                ], 200);
            }
            return new ServiceCollection($query->paginate($perPage)->appends($request->query()));
        } catch (\Throwable $th) {
            $response = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
            ];
            return response()->json($response, 500);
        }
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(ServiceRequest $request)
    {
        try {
            $validateData = $request->validated();

            if (isset($validateData['image_url'][0])) {
                $file = $request->file('image_url')[0];
                $fileName = time() . '_0_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('public/uploads/services/special', $fileName);
            }

            $service = Service::create([
                'id' => $validateData['id'],
                'name' => $validateData['name'],
                'service_category_id' => $validateData['service_category_id'] ?? null,
                'price' => $validateData['price'],
                'description' => $validateData['description'] ?? 'Mô tả cho dịch vụ',
                'image_url' => $fileName ?? "default.jpg",
                'duration' => $validateData['duration'],
                'priority' => $validateData['priority'],
                'created_by' => auth('api')->user()->id
            ]);
            if ($request->file('image_url')) {
                foreach ($request->file('image_url') as $index => $file) {
                    if ($index > 0) {
                        $fileName = time() . '_' . $index . '_' . $file->getClientOriginalName();
                        $filePath = $file->storeAs('public/uploads/services', $fileName);
                        ServiceImage::create([
                            'id' => app(Snowflake::class)->next(),
                            'service_id' => $validateData['id'],
                            'image_url' => $fileName,
                            'created_by' => auth('api')->user()->id
                        ]);
                    }
                }
            }


            $response = [
                'status' => 'success',
                'message' => 'Thêm mới dịch vụ thành công.',
                'data' => new ServiceResource(resource: $service)
            ];
            return response()->json($response);
        } catch (\Throwable $th) {
            $response = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
            ];
            return response()->json($response, 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        try {
            $query = Service::query();

            $query = $query->find($id);

            if (!$query) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }

            $arr = [
                'status' => 'success',
                'message' => 'Chi tiết dịch vụ: ' . $query->name,
                'data' => new ServiceResource($query)
            ];
            return response()->json($arr);
        } catch (\Throwable $th) {
            $arr = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình cập nhật.',
            ];
            return response()->json($arr, 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ServiceUpdateRequest $request, string $id)
    {
        try {
            $validateData = $request->validated();
            $service = Service::find($id);
            if (!$service) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }

            if (isset($validateData['image_url'][0])) {
                $file = $request->file('image_url')[0];
                $fileName = time() . '_0_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('public/uploads/services/special', $fileName);
                if ($service->image_url) {
                    Storage::delete('public/uploads/services/special/' . $service->image_url);
                }
                $service->update([
                    'image_url' => $fileName ?? $service->image_url,
                    'updated_by' => auth('api')->user()->id
                ]);
            }

            $service->update([
                'name' => $validateData['name'],
                'service_category_id' => $validateData['service_category_id'] ?? $service->service_category_id,
                'price' => $validateData['price'],
                'description' => $validateData['description'] ?? 'Mô tả cho dịch vụ',
                'duration' => $validateData['duration'],
                'priority' => $validateData['priority'],
                'updated_by' => auth('api')->user()->id,
                'status' => $validateData['status']
            ]);

            if ($request->hasFile('image_url')) {
                $oldImages = ServiceImage::where('service_id', $id)->get();
                foreach ($oldImages as $image) {
                    Storage::delete('public/uploads/services/' . $image->image_url);
                }
                $oldImages = ServiceImage::where('service_id', $id)->delete();
                foreach ($request->file('image_url') as $index => $file) {
                    if ($index > 0) {
                        $fileName = time() . '_' . $index . '_' . $file->getClientOriginalName();
                        $filePath = $file->storeAs('public/uploads/services', $fileName);
                        ServiceImage::create(
                            [
                                'id' => app(Snowflake::class)->next(),
                                'service_id' => $id,
                                'image_url' => $fileName,
                                'created_by' => auth('api')->user()->id
                            ]
                        );
                    }
                }
            }

            $response = [
                'status' => 'success',
                'message' => 'Cập nhật dịch vụ thành công.',
                'data' => new ServiceResource($service)
            ];
            return response()->json($response);

        } catch (\Throwable $th) {
            $response = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
            ];
            return response()->json($response, 500);
        }


    }


    public function serviceProducts(string $id, ServiceProductsRequest $request)
    {
        try {
            $validateData = $request->validated();
            $service = Service::find($id);
            if (!$service) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }
            foreach ($validateData['products'] as $product) {
                $existingProduct = ProductService::where('service_id', $id)
                    ->where('product_id', $product['product_id'])
                    ->first();

                if ($existingProduct) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Sản phẩm đã có trong dịch vụ.',
                    ], 404);
                }

                ProductService::create([
                    'id' => app(Snowflake::class)->next(),
                    'product_id' => $product['product_id'],
                    'quantity_used' => $product['quantity_used'],
                    'service_id' => $id
                ]);


            }
            $service->update([
                'updated_by' => auth('api')->user()->id
            ]);
            $response = [
                'status' => 'success',
                'message' => 'Thêm sản phẩm dịch vụ thành công.',
                'data' => new ServiceResource($service)
            ];
            return response()->json($response);
        } catch (\Throwable $th) {
            $response = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
            ];
            return response()->json($response, 500);
        }

    }

    public function serviceUpdateProducts(string $id, ServiceProductsRequest $request)
    {
        $validateData = $request->validated();
        $service = Service::find($id);
        if (!$service) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy dữ liệu',
            ], 404);
        }

        ProductService::where('service_id', $id)->delete();

        foreach ($validateData['products'] as $productData) {
            $productService = ProductService::where('service_id', $id)
                ->where('product_id', $productData['product_id'])
                ->first();

            if ($productService) {
                $productService->update(['quantity_used' => $productData['quantity_used']]);
            } else {
                ProductService::create([
                    'id' => app(Snowflake::class)->next(),
                    'product_id' => $productData['product_id'],
                    'quantity_used' => $productData['quantity_used'],
                    'service_id' => $id
                ]);
            }
        }
        $service->update([
            'updated_by' => auth('api')->user()->id
        ]);
        $response = [
            'status' => 'success',
            'message' => 'Cập nhật sản phẩm dịch vụ thành công.',
            'data' => new ServiceResource($service)
        ];
        return response()->json($response);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $service = Service::find($id);

            if (!$service) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy dữ liệu',
                ], 404);
            }

            if ($service->image_url) {
                Storage::delete('public/uploads/services/special/' . $service->image_url);
            }

            $serviceImages = ServiceImage::where('service_id', $id)->get();
            foreach ($serviceImages as $serviceImage) {
                Storage::delete('public/uploads/services/' . $serviceImage->image_url);
                $serviceImage->delete();
            }

            $service->delete();

            $serviceProducts = ProductService::where('service_id', $id)->delete();

            $response = [
                'status' => 'success',
                'message' => 'Xóa dịch vụ thành công.'
            ];
            return response()->json($response);

        } catch (\Throwable $th) {
            $response = [
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình.',
            ];
            return response()->json($response, 500);
        }

    }
}
