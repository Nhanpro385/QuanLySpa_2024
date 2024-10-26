import { useDispatch } from "react-redux";
import {
    productGet,
    productAdd,
    productUpdate,
    productDelete,
    productGetById
} from "@admin/redux/slices/ProductSlice";
const useproductActions = () => {
    const dispatch = useDispatch();

    const addproduct = async (data) => {
        return await dispatch(productAdd(data)); // Trả về kết quả dispatch
    };

    const getproduct = async () => {
        return await dispatch(productGet());
    };

    const updateproduct = async (data) => {
        return await dispatch(productUpdate(data));
    };

    const deleteproduct = async (id) => {
        return await dispatch(productDelete(id));
    };

    const getproductById = async (id) => {
        return await dispatch(productGetById(id));
    };

    return {
        addproduct,
        getproduct,
        updateproduct,
        deleteproduct,
        getproductById,
    };
};

export default useproductActions;
