import { useDispatch } from "react-redux";
import {
    PaymentsGet,
    PaymentsAdd,
    PaymentsUpdate,
    PaymentsDelete,
    PaymentsGetById,
    Paymentsearch,
} from "@admin/redux/slices/paymentsSlice";
const usepaymentActions = () => {
    const dispatch = useDispatch();

    const addpayment = async (data) => {
        return await dispatch(PaymentsAdd(data)); // Trả về kết quả dispatch
    };

    const getpayment = async (config) => {
        if (config) {
            return await dispatch(PaymentsGet(config));
        }
        return await dispatch(PaymentsGet());
    };

    const updatepayment = async (data) => {
        return await dispatch(PaymentsUpdate(data));
    };

    const deletepayment = async (id) => {
        return await dispatch(PaymentsDelete(id));
    };

    const getpaymentById = async (id) => {
        return await dispatch(PaymentsGetById(id));
    };
    const searchpayment = async (data) => {
        return await dispatch(Paymentsearch(data));
    };
    return {
        addpayment,
        getpayment,
        updatepayment,
        deletepayment,
        getpaymentById,
        searchpayment,
    };
};

export default usepaymentActions;
