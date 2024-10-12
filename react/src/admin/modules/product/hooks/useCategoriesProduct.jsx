import { useDispatch } from "react-redux";
import {
    categoriesGet,
    categoriesAdd,
    categoriesUpdate,
    categoriesDelete,
    categoriesGetById
} from "../../../redux/slices/CategoriesProductSlice";
const usecategoriesActions = () => {
    const dispatch = useDispatch();

    const addcategories = async (data) => {
        return await dispatch(categoriesAdd(data)); // Trả về kết quả dispatch
    };

    const getcategories = async () => {
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

    return {
        addcategories,
        getcategories,
        updatecategories,
        deletecategories,
        getcategoriesById,
    };
};

export default usecategoriesActions;
