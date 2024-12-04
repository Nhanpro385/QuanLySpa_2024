import { useDispatch } from "react-redux";
import {
    servicesGet,
    servicesAdd,
    servicesUpdate,
    servicesDelete,
    servicesGetById,
    servicesSearch,
    servicesAddProduct,
    servicesUpdateProduct,
    servicesDetailClient,
    GetservicesClient,
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
    const addProduct = async (data) => {
        return await dispatch(servicesAddProduct(data));
    };
    const updateProduct = async (data) => {
        return await dispatch(servicesUpdateProduct(data));
    };
    const getServicesDetailClient = async (config) => {
        return await dispatch(servicesDetailClient(config));
    };
    const getServicesClient = async (config) => {
        return await dispatch(GetservicesClient(config));
    };

    return {
        addservices,
        getservices,
        updateservices,
        deleteservices,
        getservicesById,
        searchservices,
        addProduct,
        updateProduct,
        getServicesDetailClient,
        getServicesClient,
    };
};

export default useServicesActions;
