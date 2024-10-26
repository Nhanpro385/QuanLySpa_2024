import { useDispatch } from "react-redux";
import {
    servicesGet,
    servicesAdd,
    servicesUpdate,
    servicesDelete,
    servicesGetById,
} from "@admin/redux/slices/serviceSlice";
const useServicesActions = () => {
    const dispatch = useDispatch();

    const addservices = async (data) => {
        return await dispatch(servicesAdd(data)); // Trả về kết quả dispatch
    };

    const getservices = async () => {
        return await dispatch(servicesGet());
    };

    const updateservices = async (data) => {
        return await dispatch(servicesUpdate(data));
    };

    const deleteservices = async (id) => {
        return await dispatch(servicesDelete(id));
    };

    const getservicesById = async (id) => {
        return await dispatch(servicesGetById(id));
    };

    return {
        addservices,
        getservices,
        updateservices,
        deleteservices,
        getservicesById,
    };
};

export default useServicesActions;
