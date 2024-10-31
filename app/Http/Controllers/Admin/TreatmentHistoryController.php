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
    public function index(Request $request)
    {
        $treatmentHistories = TreatmentHistory::paginate(10);
        return new TreatmentHistoryCollection($treatmentHistories);
    }

    public function store(StoreTreatmentHistoryRequest $request)
    {
        $treatmentHistory = TreatmentHistory::create($request->validated());
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
        $treatmentHistory = TreatmentHistory::findOrFail($id);
        $treatmentHistory->update($request->validated());
        return new TreatmentHistoryResource($treatmentHistory);
    }

    public function destroy($id)
    {
        $treatmentHistory = TreatmentHistory::findOrFail($id);
        $treatmentHistory->delete();
        return response()->json(['message' => 'Xóa Treatment History thành công']);
    }
}
