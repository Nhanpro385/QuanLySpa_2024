import { useDispatch } from "react-redux";
import {
    ServiceCategoriesGet,
    ServiceCategoriesAdd,
    ServiceCategoriesUpdate,
    ServiceCategoriesDelete,
    ServiceCategoriesGetById,
} from "@admin/redux/slices/servicesCategoriesSlice";
const useServiceCategoriesActions = () => {
    const dispatch = useDispatch();

    const addServiceCategories = async (data) => {
        return await dispatch(ServiceCategoriesAdd(data)); // Trả về kết quả dispatch
    };

    const getServiceCategories = async () => {
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

    return {
        addServiceCategories,
        getServiceCategories,
        updateServiceCategories,
        deleteServiceCategories,
        getServiceCategoriesById,
    };
};

export default useServiceCategoriesActions;
