import { useDispatch } from "react-redux";
import {
    appointmentsGet,
    appointmentsAdd,
    appointmentsUpdate,
    appointmentsDelete,
    appointmentsGetById,
    appointmentsSearch,
    GetAppointmentByStatus,
} from "@admin/redux/slices/appointmentsSlice";
const useappointmentsActions = () => {
    const dispatch = useDispatch();

    const addappointments = async (data) => {
        return await dispatch(appointmentsAdd(data));
    };

    const getappointments = async () => {
        return await dispatch(appointmentsGet());
    };

    const updateappointments = async (data) => {
        return await dispatch(appointmentsUpdate(data));
    };

    const deleteappointments = async (id) => {
        return await dispatch(appointmentsDelete(id));
    };

    const getappointmentsById = async (id) => {
        return await dispatch(appointmentsGetById(id));
    };
    const searchappointments = async (data) => {
        return await dispatch(appointmentsSearch(data));
    };
    const getappointmentsByStatus = async (data) => {
        return await dispatch(GetAppointmentByStatus(data));
    };

    return {
        addappointments,
        getappointments,
        updateappointments,
        deleteappointments,
        getappointmentsById,
        searchappointments,
        getappointmentsByStatus,
    };
};

export default useappointmentsActions;
