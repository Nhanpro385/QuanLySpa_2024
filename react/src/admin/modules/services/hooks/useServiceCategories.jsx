import { useDispatch } from "react-redux";
import {
    ServiceCategoriesGet,
    ServiceCategoriesAdd,
    ServiceCategoriesUpdate,
    ServiceCategoriesDelete,
    ServiceCategoriesGetById,
    ServiceCategoriesSearch,
    ServiceCategoriesGetClient,
    ServiceCategoriesGetClientById,
} from "@admin/redux/slices/servicesCategoriesSlice";
const useServiceCategoriesActions = () => {
    const dispatch = useDispatch();

    const addServiceCategories = async (data) => {
        return await dispatch(ServiceCategoriesAdd(data)); // Trả về kết quả dispatch
    };

    const getServiceCategories = async (config) => {
        if (config) {
            return await dispatch(ServiceCategoriesGet(config));
        }
        return await dispatch(ServiceCategoriesGet());
    };

    const updateServiceCategories = async (data) => {
        return await dispatch(ServiceCategoriesUpdate(data));
    };

    const deleteServiceCategories = async (id) => {
        return await dispatch(ServiceCategoriesDelete(id));
    };

    const getServiceCategoriesById = async (id) => {
        return await dispatch(ServiceCategoriesGetById(id));
    };
    const searchServiceCategories = async (query) => {
        return await dispatch(ServiceCategoriesSearch(query));
    };
    const getServiceCategoriesClient = async (config) => {
        if (config) {
            return await dispatch(ServiceCategoriesGetClient(config));
        }
        return await dispatch(ServiceCategoriesGetClient());
    };
    const getServiceCategoriesClientById = async (id) => {
        return await dispatch(ServiceCategoriesGetClientById(id));
    }

    return {
        addServiceCategories,
        getServiceCategories,
        updateServiceCategories,
        deleteServiceCategories,
        getServiceCategoriesById,
        searchServiceCategories,
        getServiceCategoriesClient,
        getServiceCategoriesClientById,
    };
};

export default useServiceCategoriesActions;
