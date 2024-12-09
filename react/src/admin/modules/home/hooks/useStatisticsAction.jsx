import {
    monthlyRevenuesGet,
    weeklyRevenuesGet,
    dailyRevenuesGet,
    revenueAppointmentGet,
    revenueConsulationGet,
    staffConsulationsGet,
    staffAppoimentsGet,
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
    const getStaffConsulations = async (config) => {
        if (config) {
            return await dispatch(staffConsulationsGet(config));
        }
        return await dispatch(staffConsulationsGet());
    };
    const getStaffAppoiments = async (config) => {
        if (config) {
            return await dispatch(staffAppoimentsGet(config));
        }
        return await dispatch(staffAppoimentsGet());
    };

    return {
        getMonthlyRevenues,
        getWeeklyRevenues,
        getDailyRevenues,
        getRevenueAppointment,
        getRevenueConsulation,
        getStaffConsulations,
        getStaffAppoiments,
    };
};
export default useStatisticsAction;
