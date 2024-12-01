import { useDispatch } from "react-redux";
import {
    SupplierAdd,
    SupplierGet,
    SupplierUpdate,
    SupplierDelete,
    SupplierGetbyId,
    SupplierSearch,
} from "@admin/redux/slices/SupplierSlice";
const useSupplierActions = () => {
    const dispatch = useDispatch();

    const addSupplier = async (data) => {
        return await dispatch(SupplierAdd(data)); // Trả về kết quả dispatch
    };

    const getSupplier = async (config) => {
        if (config) {
            return await dispatch(SupplierGet(config));
        }
        return await dispatch(SupplierGet());
    };

    const updateSupplier = async (data) => {
        return await dispatch(SupplierUpdate(data));
    };

    const deleteSupplier = async (id) => {
        return await dispatch(SupplierDelete(id));
    };

    const getSupplierById = async (id) => {
        return await dispatch(SupplierGetbyId(id));
    };
    const searchSupplier = async (data) => {
        return await dispatch(SupplierSearch(data));
    };
    return {
        addSupplier,
        getSupplier,
        updateSupplier,
        deleteSupplier,
        getSupplierById,
        searchSupplier,
    };
};

export default useSupplierActions;
