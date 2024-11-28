import {
    monthlyRevenuesGet,
    weeklyRevenuesGet,
    dailyRevenuesGet,
    revenueAppointmentGet,
    revenueConsulationGet,
} from "@admin/redux/slices/statisticalSlice";
import { useDispatch } from "react-redux";

const useStatisticsAction = () => {
    const dispatch = useDispatch();

    const getMonthlyRevenues = async (config) => {
        if (config) {
            return await dispatch(monthlyRevenuesGet(config));
        }
        return await dispatch(monthlyRevenuesGet());
    };

    const getWeeklyRevenues = async (config) => {
        if (config) {
            return await dispatch(weeklyRevenuesGet(config));
        }
        return await dispatch(weeklyRevenuesGet());
    };

    const getDailyRevenues = async (config) => {
        if (config) {
            return await dispatch(dailyRevenuesGet(config));
        }
        return await dispatch(dailyRevenuesGet());
    };

    const getRevenueAppointment = async (config) => {
        if (config) {
            return await dispatch(revenueAppointmentGet(config));
        }
        return await dispatch(revenueAppointmentGet());
    };
    const getRevenueConsulation = async (config) => {
        if (config) {
            return await dispatch(revenueConsulationGet(config));
        }
        return await dispatch(revenueConsulationGet());
    };
    return {
        getMonthlyRevenues,
        getWeeklyRevenues,
        getDailyRevenues,
        getRevenueAppointment,
        getRevenueConsulation,
    };
};
export default useStatisticsAction;
