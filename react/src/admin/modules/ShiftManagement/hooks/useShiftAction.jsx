import { useDispatch } from "react-redux";
import {
    shiftsGet,
    shiftsAdd,
    shiftsDelete,
    shiftsUpdate,
    shiftsGetById,
    shiftsSearch,
} from "@admin/redux/slices/ShiftSlice";
const useShiftAction = () => {
    const dispatch = useDispatch();

    const shiftadd = async (data) => {
        return await dispatch(shiftsAdd(data)); // Trả về kết quả dispatch
    };

    const shiftdelete = async (id) => {
        return await dispatch(shiftsDelete(id));
    };

    const shiftupdate = async (data) => {
        return await dispatch(shiftsUpdate(data));
    };

    const getshiftsById = async (id) => {
        return await dispatch(shiftsGetById(id));
    };

    const searchshifts = async (id) => {
        return await dispatch(shiftsSearch(id));
    };
    const getshifts = async (data) => {
        return await dispatch(shiftsGet(data));
    };

    return {
        shiftadd,
        shiftdelete,
        shiftupdate,
        getshiftsById,
        searchshifts,
        getshifts,
    };
};

export default useShiftAction;
