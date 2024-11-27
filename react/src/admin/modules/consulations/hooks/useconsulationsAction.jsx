import {
    consulationsGet,
    consulationsAdd,
    consulationsDelete,
    consulationsUpdate,
    consulationsGetById,
    consulationsearch,
    consulationsaccept,
} from "@admin/redux/slices/consulationsSlice";
import { useDispatch } from "react-redux";
const useconsulationsAction = () => {
    const dispatch = useDispatch();
    const getconsulations = async (config) => {
        if (config) {
            return await dispatch(consulationsGet(config));
        }
        return await dispatch(consulationsGet());
    };
    const addconsulations = async (data) => {
        return await dispatch(consulationsAdd(data));
    };
    const deleteconsulations = async (id) => {
        return await dispatch(consulationsDelete(id));
    };
    const updateconsulations = async (data) => {
        return await dispatch(consulationsUpdate(data));
    };
    const searchconsulations = async (data) => {
        return await dispatch(consulationsearch(data));
    };
    const getbyidconsulations = async (id) => {
        return await dispatch(consulationsGetById(id));
    };
    const acceptConsulations = async (id) => {
        return await dispatch(consulationsaccept(id));
    };
    return {
        getconsulations,
        addconsulations,
        getbyidconsulations,
        searchconsulations,
        updateconsulations,
        deleteconsulations,
        acceptConsulations,
    };
};
export default useconsulationsAction;
