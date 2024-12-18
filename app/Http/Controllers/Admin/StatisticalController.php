<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Consulation;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticalController extends Controller
{
    // public function revenues(Request $request)
    // {
    //     $day = Carbon::today()->format('Y-m-d');
    //     if ($request->input('day')) {
    //         $day = $request->input('day');
    //     }
    //     $total_revenue_today = Payment::whereDate('created_at', $day)->sum('total_amount');

    //     $completed_revenue = Payment::whereDate('created_at', $day)->where('status', 1)->sum('total_amount');

    //     $pending_revenue = Payment::whereDate('created_at', $day)->where('status', 0)->sum('total_amount');

    //     $cash_revenue = Payment::whereDate('created_at', $day)->where('payment_type', 0)->sum('total_amount');

    //     $transfer_revenue = Payment::whereDate('created_at', $day)->where('payment_type', 1)->sum('total_amount');

    //     if ($request->input('count') == true) {

    //         $total_revenue_today = Payment::whereDate('created_at', $day)->count();

    //         $completed_revenue = Payment::whereDate('created_at', $day)->where('status', 1)->count();

    //         $pending_revenue = Payment::whereDate('created_at', $day)->where('status', 0)->count();

    //         $cash_revenue = Payment::whereDate('created_at', $day)->where('payment_type', 1)->count();

    //         $transfer_revenue = Payment::whereDate('created_at', $day)->where('payment_type', 0)->count();
    //     }
    //     $arr = [
    //         'status' => true,
    //         'messager' => 'Thống kê doanh thu-số lượng: ' . $day,
    //         'data' => [
    //             'total_revenue_today' => $total_revenue_today,
    //             'completed_revenue' => $completed_revenue,
    //             'pending_revenue' => $pending_revenue,
    //             'cash_revenue' => $cash_revenue,
    //             'transfer_revenue' => $transfer_revenue
    //         ],
    //     ];
    //     return response($arr, 200);

    // }

    public function dailyRevenues(Request $request)
    {
        // Xác định ngày tùy chỉnh hoặc mặc định là ngày hiện tại
        $day = $request->input('day', Carbon::today()->format('Y-m-d'));

        // Tính toán doanh thu và số lượng
        $total_revenue = Payment::whereDate('created_at', $day)->sum('total_amount');
        $completed_revenue = Payment::whereDate('created_at', $day)
            ->where('status', 1)
            ->sum('total_amount');
        $pending_revenue = Payment::whereDate('created_at', $day)
            ->where('status', 0)
            ->sum('total_amount');
        $cash_revenue = Payment::whereDate('created_at', $day)
            ->where('payment_type', 0)
            ->sum('total_amount');
        $transfer_revenue = Payment::whereDate('created_at', $day)
            ->where('payment_type', 1)
            ->sum('total_amount');

        // Đếm số lượng giao dịch
        $total_count = Payment::whereDate('created_at', $day)->count();
        $completed_count = Payment::whereDate('created_at', $day)
            ->where('status', 1)
            ->count();
        $pending_count = Payment::whereDate('created_at', $day)
            ->where('status', 0)
            ->count();
        $cash_count = Payment::whereDate('created_at', $day)
            ->where('payment_type', 0)
            ->count();
        $transfer_count = Payment::whereDate('created_at', $day)
            ->where('payment_type', 1)
            ->count();

        $arr = [
            'status' => true,
            'message' => 'Thống kê doanh thu và số lượng giao dịch trong ngày: ' . $day,
            'data' => [
                'total_revenue' => $total_revenue,
                'completed_revenue' => $completed_revenue,
                'pending_revenue' => $pending_revenue,
                'cash_revenue' => $cash_revenue,
                'transfer_revenue' => $transfer_revenue,
                'total_count' => $total_count,
                'completed_count' => $completed_count,
                'pending_count' => $pending_count,
                'cash_count' => $cash_count,
                'transfer_count' => $transfer_count,
            ],
        ];
        return response($arr, 200);
    }

    public function weeklyRevenues(Request $request)
    {
        // Xác định năm và tuần tùy chỉnh hoặc mặc định là tuần hiện tại
        $year = $request->input('year', Carbon::now()->year);
        $week = $request->input('week', Carbon::now()->week);

        // Lấy thời gian bắt đầu và kết thúc của tuần
        $startOfWeek = Carbon::now()->setISODate($year, $week)->startOfWeek()->format('Y-m-d H:i:s');
        $endOfWeek = Carbon::now()->setISODate($year, $week)->endOfWeek()->format('Y-m-d H:i:s');

        // Tính toán doanh thu và số lượng
        $total_revenue = Payment::whereBetween('created_at', [$startOfWeek, $endOfWeek])->sum('total_amount');
        $completed_revenue = Payment::whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->where('status', 1)
            ->sum('total_amount');
        $pending_revenue = Payment::whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->where('status', 0)
            ->sum('total_amount');
        $cash_revenue = Payment::whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->where('payment_type', 0)
            ->sum('total_amount');
        $transfer_revenue = Payment::whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->where('payment_type', 1)
            ->sum('total_amount');

        // Đếm số lượng giao dịch
        $total_count = Payment::whereBetween('created_at', [$startOfWeek, $endOfWeek])->count();
        $completed_count = Payment::whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->where('status', 1)
            ->count();
        $pending_count = Payment::whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->where('status', 0)
            ->count();
        $cash_count = Payment::whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->where('payment_type', 0)
            ->count();
        $transfer_count = Payment::whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->where('payment_type', 1)
            ->count();

        $arr = [
            'status' => true,
            'message' => 'Thống kê doanh thu và số lượng giao dịch theo tuần: ' . $year . '-' . $week,
            'data' => [
                'total_revenue' => $total_revenue,
                'completed_revenue' => $completed_revenue,
                'pending_revenue' => $pending_revenue,
                'cash_revenue' => $cash_revenue,
                'transfer_revenue' => $transfer_revenue,
                'total_count' => $total_count,
                'completed_count' => $completed_count,
                'pending_count' => $pending_count,
                'cash_count' => $cash_count,
                'transfer_count' => $transfer_count,
            ],
        ];
        return response($arr, 200);
    }

    public function monthlyRevenues(Request $request)
    {
        // Xác định tháng và năm tùy chỉnh hoặc mặc định là tháng hiện tại
        $year = $request->input('year', Carbon::now()->year);
        $month = $request->input('month', Carbon::now()->month);

        $startOfMonth = Carbon::create($year, $month)->startOfMonth()->format('Y-m-d H:i:s');
        $endOfMonth = Carbon::create($year, $month)->endOfMonth()->format('Y-m-d H:i:s');

        // Tính toán doanh thu và số lượng
        $total_revenue = Payment::whereBetween('created_at', [$startOfMonth, $endOfMonth])->sum('total_amount');
        $completed_revenue = Payment::whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->where('status', 1)
            ->sum('total_amount');
        $pending_revenue = Payment::whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->where('status', 0)
            ->sum('total_amount');
        $cash_revenue = Payment::whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->where('payment_type', 0)
            ->sum('total_amount');
        $transfer_revenue = Payment::whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->where('payment_type', 1)
            ->sum('total_amount');

        // Đếm số lượng giao dịch
        $total_count = Payment::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();
        $completed_count = Payment::whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->where('status', 1)
            ->count();
        $pending_count = Payment::whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->where('status', 0)
            ->count();
        $cash_count = Payment::whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->where('payment_type', 0)
            ->count();
        $transfer_count = Payment::whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->where('payment_type', 1)
            ->count();

        $arr = [
            'status' => true,
            'message' => 'Thống kê doanh thu và số lượng giao dịch theo tháng: ' . $year . '-' . $month,
            'data' => [
                'total_revenue' => $total_revenue,
                'completed_revenue' => $completed_revenue,
                'pending_revenue' => $pending_revenue,
                'cash_revenue' => $cash_revenue,
                'transfer_revenue' => $transfer_revenue,
                'total_count' => $total_count,
                'completed_count' => $completed_count,
                'pending_count' => $pending_count,
                'cash_count' => $cash_count,
                'transfer_count' => $transfer_count,
            ],
        ];
        return response($arr, 200);
    }

    public function appointments(Request $request)
    {
        $day = Carbon::today()->format('Y-m-d');
        if ($request->input('day')) {
            $day = $request->input('day');
        }
        $today_appointment = Appointment::whereDate('appointment_date', $day)->whereDate('appointment_date', $day)->count();

        $cancel_appointment = Appointment::whereDate('appointment_date', $day)->whereDate('appointment_date', $day)->where('status', 0)->count();

        $appointment = Appointment::whereDate('appointment_date', $day)->whereDate('appointment_date', $day)->where('status', 1)->count();

        $progress_appointment = Appointment::whereDate('appointment_date', $day)->whereDate('appointment_date', $day)->where('status', 2)->count();

        $completed_appointment = Appointment::whereDate('appointment_date', $day)->whereDate('appointment_date', $day)->where('status', 3)->count();

        $arr = [
            'status' => true,
            'messager' => 'Thống kê lịch hẹn: ' . $day,
            'data' => [
                'today_appointment' => $today_appointment,
                'appointment' => $appointment,
                'cancel_appointment' => $cancel_appointment,
                'progress_appointment' => $progress_appointment,
                'completed_appointment' => $completed_appointment,

            ],
        ];
        return response($arr, 200);

    }

    public function consulations(Request $request)
    {
        $day = Carbon::today()->format('Y-m-d');
        if ($request->input('day')) {
            $day = $request->input('day');
        }
        $today_consulation = Consulation::whereDate('created_at', $day)->count();

        $complete_consulation = Consulation::whereDate('created_at', $day)->where('status', 2)->count();

        $request_consulation = Consulation::whereDate('created_at', $day)->where('status', 0)->count();

        $progress_consulation = Consulation::whereDate('created_at', $day)->where('status', 1)->count();

        $arr = [
            'status' => true,
            'messager' => 'Thống kê lịch tư vấn: ' . $day,
            'data' => [
                'today_consulation' => $today_consulation,
                'complete_consulation' => $complete_consulation,
                'request_consulation' => $request_consulation,
                'progress_consulation' => $progress_consulation,
            ],
        ];
        return response($arr, 200);

    }

    public function staffConsulations(Request $request)
    {
        $day = Carbon::today();
        if ($request->input('day')) {
            $day = Carbon::parse($request->input('day'));
        }
        $dailyConsultationCount = DB::table('consulations')
            ->join('users', 'consulations.staff_id', '=', 'users.id')
            ->whereIn('consulations.status', [1, 2])
            ->whereDate('consulations.created_at', $day)
            ->groupBy(['staff_id', 'users.full_name'])
            ->select('staff_id', 'users.full_name', DB::raw('count(*) as total'))
            ->get();

        $weekOfYear = $day->weekOfYear;
        $weeklyConsultationCount = DB::table('consulations')
            ->join('users', 'consulations.staff_id', '=', 'users.id')
            ->whereIn('consulations.status', [1, 2])
            ->whereBetween('consulations.created_at', [Carbon::parse($day)->startOfWeek(), Carbon::parse($day)->endOfWeek()])
            ->groupBy(['staff_id', 'users.full_name'])->select('staff_id', 'users.full_name', DB::raw('count(*) as total'))
            ->get();

        $monthOfYear = $day->month;
        $monthlyConsultationCount = DB::table('consulations')
            ->join('users', 'consulations.staff_id', '=', 'users.id')
            ->whereIn('consulations.status', [1, 2])
            ->whereBetween('consulations.created_at', [Carbon::parse($day)->startOfMonth(), Carbon::parse($day)->endOfMonth()])
            ->groupBy(['staff_id', 'users.full_name'])
            ->select('staff_id', 'users.full_name', DB::raw('count(*) as total'))
            ->get();

        $arr = [
            'status' => true,
            'messager' => 'Thống kê lịch tư vấn của từng nhân viên: ' . $day->format('Y-m-d') . ' - Tuần: ' . $weekOfYear . ' - Tháng: ' . $monthOfYear,
            'data' => [
                'today' => $dailyConsultationCount,
                'week' => $weeklyConsultationCount,
                'month' => $monthlyConsultationCount
            ]
        ];
        return response($arr, 200);
    }

    public function staffAppoiments(Request $request)
    {
        $day = Carbon::today();
        if ($request->input('day')) {
            $day = Carbon::parse($request->input('day'));
        }
        $dailyAppointmentsCount = DB::table('appointment_staffs')
            ->join('users', 'appointment_staffs.staff_id', '=', 'users.id')
            ->join('appointments', 'appointment_staffs.appointment_id', '=', 'appointments.id')
            ->whereIn('appointments.status', [1, 2, 3])
            ->whereDate('appointment_staffs.created_at', $day)
            ->groupBy(['staff_id', 'users.full_name'])
            ->select('staff_id', 'users.full_name', DB::raw('count(*) as total'))
            ->get();

        $weekOfYear = $day->weekOfYear;
        $weeklyAppointmentsCount = DB::table('appointment_staffs')
            ->join('users', 'appointment_staffs.staff_id', '=', 'users.id')
            ->join('appointments', 'appointment_staffs.appointment_id', '=', 'appointments.id')
            ->whereIn('appointments.status', [1, 2, 3])
            ->whereBetween('appointment_staffs.created_at', [Carbon::parse($day)->startOfWeek(), Carbon::parse($day)->endOfWeek()])
            ->groupBy(['staff_id', 'users.full_name'])->select('staff_id', 'users.full_name', DB::raw('count(*) as total'))
            ->get();

        $monthOfYear = $day->month;
        $monthlyAppointmentsCount = DB::table('appointment_staffs')
            ->join('users', 'appointment_staffs.staff_id', '=', 'users.id')
            ->join('appointments', 'appointment_staffs.appointment_id', '=', 'appointments.id')
            ->whereIn('appointments.status', [1, 2, 3])
            ->whereBetween('appointment_staffs.created_at', [Carbon::parse($day)->startOfMonth(), Carbon::parse($day)->endOfMonth()])
            ->groupBy(['staff_id', 'users.full_name'])
            ->select('staff_id', 'users.full_name', DB::raw('count(*) as total'))
            ->get();

        $arr = [
            'status' => true,
            'messager' => 'Thống kê lịch hẹn của từng nhân viên: ' . $day->format('Y-m-d') . ' - Tuần: ' . $weekOfYear . ' - Tháng: ' . $monthOfYear,
            'data' => [
                'today' => $dailyAppointmentsCount,
                'week' => $weeklyAppointmentsCount,
                'month' => $monthlyAppointmentsCount
            ]
        ];
        return response($arr, 200);
    }


}
