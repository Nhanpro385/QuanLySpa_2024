<?php

namespace App\Http\Controllers\Admin;

use App\Filters\Admin\ServiceFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Services\ServiceRequest;
use App\Http\Requests\Admin\Services\ServiceUpdateRequest;
use App\Http\Resources\Admin\Services\ServiceCollection;
use App\Http\Resources\Admin\Services\ServiceResource;
use App\Models\Service;
use App\Models\ServiceImage;
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
            $query = Service::where($queryItems);
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
                $service = Service::create([
                    'id' => $validateData['id'],
                    'name' => $validateData['name'],
                    'service_category_id' => $validateData['service_category_id'] ?? null,
                    'price' => $validateData['price'],
                    'description' => $validateData['description'] ?? 'Mô tả cho dịch vụ',
                    'image_url' => $fileName,
                    'duration' => $validateData['duration'],
                    'created_by' => $validateData['created_by'] ?? null,
                ]);
            }

            foreach ($request->file('image_url') as $index => $file) {
                if ($index > 0) {
                    $fileName = time() . '_' . $index . '_' . $file->getClientOriginalName();
                    $filePath = $file->storeAs('public/uploads/services', $fileName);
                    ServiceImage::create([
                        'id' => app(Snowflake::class)->next(),
                        'service_id' => $validateData['id'],
                        'image_url' => $fileName,
                        'created_by' => $validateData['created_by'] ?? null,
                    ]);
                }
            }

            $response = [
                'status' => 'success',
                'message' => 'Thêm mới dịch vụ thành công.',
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
            $createdBy = $request->query('created_by');
            if ($createdBy) {
                $query = $query->with('createdBy')->find($id);
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
            if ($service->image_url) {
                Storage::delete('public/uploads/services/special/' . $service->image_url);
            }
            if (isset($validateData['image_url'][0])) {
                $file = $request->file('image_url')[0];
                $fileName = time() . '_0_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('public/uploads/services/special', $fileName);

                $service->update([
                    'name' => $validateData['name'],
                    'service_category_id' => $validateData['service_category_id'] ?? $service->service_category_id,
                    'price' => $validateData['price'],
                    'description' => $validateData['description'] ?? 'Mô tả cho dịch vụ',
                    'image_url' => $fileName ?? $service->image_url,
                    'duration' => $validateData['duration'],
                    'created_by' => $validateData['created_by'] ?? $service->created_by,
                ]);
            }


            if ($request->hasFile('image_url')) {
                foreach ($request->file('image_url') as $index => $file) {
                    if ($index > 0) {
                        $oldImage = ServiceImage::where('service_id', $id)->skip($index - 1)->first();
                        if ($oldImage) {
                            Storage::delete('public/uploads/services/' . $oldImage->image_url);
                            $oldImage->delete();
                        }
                        $fileName = time() . '_' . $index . '_' . $file->getClientOriginalName();
                        $filePath = $file->storeAs('public/uploads/services', $fileName);
                        ServiceImage::updateOrCreate(
                            [
                                'id' => app(Snowflake::class)->next(),
                                'service_id' => $id,
                                'image_url' => $fileName,
                                'created_by' => $validateData['created_by'] ?? $service->created_by,
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
