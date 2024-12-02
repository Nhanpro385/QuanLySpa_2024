import { useDispatch } from "react-redux";
import {
    CustomerGet,
    CustomerAdd,
    CustomerUpdate,
    CustomerDelete,
    CustomerGetbyId,
    CustomerSearch,
} from "@admin/redux/slices/CustomerSlice";
const useCustomerActions = () => {
    const dispatch = useDispatch();

    const addCustomer = async (data) => {
        return await dispatch(CustomerAdd(data)); // Trả về kết quả dispatch
    };

    const getCustomer = async (config) => {
        if (config) {
            return await dispatch(CustomerGet(config));
        }
        return await dispatch(CustomerGet());
    };

    const updateCustomer = async (data) => {
        return await dispatch(CustomerUpdate(data));
    };

    const deleteCustomer = async (id) => {
        return await dispatch(CustomerDelete(id));
    };

    const getCustomerById = async (id) => {
        return await dispatch(CustomerGetbyId(id));
    };
    const searchCustomer = async (data) => {
        console.log(data);
        
        return await dispatch(CustomerSearch(data));
    };
    return {
        addCustomer,
        getCustomer,
        updateCustomer,
        deleteCustomer,
        getCustomerById,
        searchCustomer,
    };
};

export default useCustomerActions;
