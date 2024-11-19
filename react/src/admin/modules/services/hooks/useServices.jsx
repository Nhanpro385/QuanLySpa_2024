import { useDispatch } from "react-redux";
import {
    servicesGet,
    servicesAdd,
    servicesUpdate,
    servicesDelete,
    servicesGetById,
    servicesSearch,
} from "@admin/redux/slices/serviceSlice";
const useServicesActions = () => {
    const dispatch = useDispatch();

    const addservices = async (data) => {
        return await dispatch(servicesAdd(data)); // Trả về kết quả dispatch
    };

    const getservices = async (config) => {
        console.log("config", config);
        
        return await dispatch(servicesGet(config));
    };

    const updateservices = async ({ data, id }) => {
        return await dispatch(servicesUpdate({ data, id }));
    };

    const deleteservices = async (id) => {
        return await dispatch(servicesDelete(id));
    };

    const getservicesById = async (id) => {
        return await dispatch(servicesGetById(id));
    };
    const searchservices = async (params) => {
        return await dispatch(servicesSearch(params));
    };

    return {
        addservices,
        getservices,
        updateservices,
        deleteservices,
        getservicesById,
        searchservices,
    };
};

export default useServicesActions;
