import {
    StreatmentGet,
    StreatmentAdd,
    StreatmentDelete,
    StreatmentUpdate,
    StreatmentSearch,
    StreatmentGetById,
    StreatmentGetByCustomer,
} from "@admin/redux/slices/strearmentSlice";
import { useDispatch } from "react-redux";
const useStreatmentsAction = () => {
    const dispatch = useDispatch();
    const getStreatments = async () => {
        const response = await dispatch(StreatmentGet());
        return response;
    };
    const addStreatment = async (data) => {
        const response = await dispatch(StreatmentAdd(data));

        return response;
    };
    const deleteStreatment = async (id) => {
        const response = await dispatch(StreatmentDelete(id));
        return response;
    };
    const updateStreatment = async (data) => {
        const response = await dispatch(StreatmentUpdate(data));
        return response;
    };
    const searchStreatment = async (data) => {
        const response = await dispatch(StreatmentSearch(data));
        return response;
    };
    const getStreatmentById = async (id) => {
        const response = await dispatch(StreatmentGetById(id));
        return response;
    };
    const getStreatmentByCustomer = async (id) => {
        const response = await dispatch(StreatmentGetByCustomer(id));
        return response;
    };
    return {
        getStreatments,
        addStreatment,
        deleteStreatment,
        updateStreatment,
        searchStreatment,
        getStreatmentById,
        getStreatmentByCustomer,
    };
};
export default useStreatmentsAction;
