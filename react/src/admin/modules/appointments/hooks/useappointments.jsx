import { useDispatch } from "react-redux";
import {
    appointmentsGet,
    appointmentsAdd,
    appointmentsUpdate,
    appointmentsDelete,
    appointmentsGetById
} from "@admin/redux/slices/appointments";
const useappointmentsActions = () => {
    const dispatch = useDispatch();

    const addappointments = async (data) => {
        return await dispatch(appointmentsAdd(data)); // Trả về kết quả dispatch
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

    return {
        addappointments,
        getappointments,
        updateappointments,
        deleteappointments,
        getappointmentsById,
    };
};

export default useappointmentsActions;
