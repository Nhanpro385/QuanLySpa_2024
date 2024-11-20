import {
    StreatmentGet,
    StreatmentAdd,
    StreatmentDelete,
    StreatmentUpdate,
} from "@admin/redux/slices/strearmentSlice";
import { useDispatch } from "react-redux";
const useStreatmentsAction = () => {
    const dispatch = useDispatch();
    const getStreatments = async () => {
        const response = await dispatch(StreatmentGet());
        return response.data;
    };
    const addStreatment = async (data) => {
        const response = await dispatch(StreatmentAdd(data));
        return response.data;
    };
    const deleteStreatment = async (id) => {
        const response = await dispatch(StreatmentDelete(id));
        return response.data;
    };
    const updateStreatment = async (data) => {
        const response = await dispatch(StreatmentUpdate(data));
        return response.data;
    };

    return {
        getStreatments,
        addStreatment,
        deleteStreatment,
        updateStreatment,
    };
};
export default useStreatmentsAction;
