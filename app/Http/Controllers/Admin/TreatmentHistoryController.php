<?php

namespace App\Http\Controllers\Admin;

use App\Models\TreatmentHistory;
use App\Http\Requests\Admin\TreatmentHistory\StoreTreatmentHistoryRequest;
use App\Http\Requests\Admin\TreatmentHistory\UpdateTreatmentHistoryRequest;
use App\Http\Resources\Admin\TreatmentHistory\TreatmentHistoryResource;
use App\Http\Resources\Admin\TreatmentHistory\TreatmentHistoryCollection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class TreatmentHistoryController extends Controller
{
    public function index()
{
    $treatmentHistories = TreatmentHistory::with(['createdBy:id,name,role', 'updatedBy:id,name,role'])->get();

    return response()->json([
        'data' => $treatmentHistories->map(function ($treatmentHistory) {
            return [
                'id' => $treatmentHistory->id,
                'service_id' => $treatmentHistory->service_id,
                'customer_id' => $treatmentHistory->customer_id,
                'appointment_id' => $treatmentHistory->appointment_id,
                'staff_id' => $treatmentHistory->staff_id,
                'image_before' => $treatmentHistory->image_before,
                'image_after' => $treatmentHistory->image_after,
                'feedback' => $treatmentHistory->feedback,
                'note' => $treatmentHistory->note,
                'status' => $treatmentHistory->status,
                'evaluete' => $treatmentHistory->evaluete,
                'created_by' => $treatmentHistory->createdBy ? [
                    'id' => $treatmentHistory->createdBy->id,
                    'name' => $treatmentHistory->createdBy->name,
                    'role' => $treatmentHistory->createdBy->role,
                ] : null,
                'updated_by' => $treatmentHistory->updatedBy ? [
                    'id' => $treatmentHistory->updatedBy->id,
                    'name' => $treatmentHistory->updatedBy->name,
                    'role' => $treatmentHistory->updatedBy->role,
                ] : null,
                'created_at' => $treatmentHistory->created_at,
                'updated_at' => $treatmentHistory->updated_at,
            ];
        }),
    ]);
}

    public function store(StoreTreatmentHistoryRequest $request)
{
    $data = $request->validated();
    $data['created_by'] = auth()->id();
    
    $treatmentHistory = TreatmentHistory::create($data);

    return response()->json([
        'message' => 'Tạo Treatment History thành công',
        'data' => new TreatmentHistoryResource($treatmentHistory)
    ], 201);
}
    public function show($id)
    {
        $treatmentHistory = TreatmentHistory::findOrFail($id);
        return new TreatmentHistoryResource($treatmentHistory);
    }

    
    public function update(UpdateTreatmentHistoryRequest $request, $id)
    {
        // Retrieve the treatment history record or return a 404 response if not found
        $treatmentHistory = TreatmentHistory::findOrFail($id);
    
        // Validate the request data and include the authenticated user's ID as 'updated_by'
        $data = $request->validated();
        
    
        // Perform the update with the validated data
        $treatmentHistory->update($data);
    
        // Return a consistent response format with the updated resource
        return response()->json([
            'message' => 'Cập nhật Treatment History thành công',
            'data' => new TreatmentHistoryResource($treatmentHistory)
        ], 200);
    }
    

    public function destroy($id)
    {
        $treatmentHistory = TreatmentHistory::findOrFail($id);
        $treatmentHistory->delete();
        return response()->json(['message' => 'Xóa Treatment History thành công']);
    }
}
