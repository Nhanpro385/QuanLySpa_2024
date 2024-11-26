import { useDispatch } from "react-redux";
import {
    categoriesGet,
    categoriesAdd,
    categoriesUpdate,
    categoriesDelete,
    categoriesGetById,
    categoriesSearch,
} from "@admin/redux/slices/CategoriesProductSlice";
const usecategoriesActions = () => {
    const dispatch = useDispatch();

    const addcategories = async (data) => {
        return await dispatch(categoriesAdd(data)); // Trả về kết quả dispatch
    };

    const getcategories = async (config) => {
        if (config) {
            return await dispatch(categoriesGet(config));
        }
        return await dispatch(categoriesGet());
    };

    const updatecategories = async (data) => {
        return await dispatch(categoriesUpdate(data));
    };

    const deletecategories = async (id) => {
        return await dispatch(categoriesDelete(id));
    };

    const getcategoriesById = async (id) => {
        return await dispatch(categoriesGetById(id));
    };
    const searchcategories = async (data) => {
        return await dispatch(categoriesSearch(data));
    };
    return {
        addcategories,
        getcategories,
        updatecategories,
        deletecategories,
        getcategoriesById,
        searchcategories,
    };
};

export default usecategoriesActions;
