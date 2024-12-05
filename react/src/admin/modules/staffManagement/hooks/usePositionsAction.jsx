import { useDispatch } from "react-redux";
import {
    PositionsGet,
    PositionsAdd,
    PositionsUpdate,
    PositionsDelete,
    PositionsGetById,
    PositionsSearch,
} from "@admin/redux/slices/PositionsSlice";

const usePositionsActions = () => {
    const dispatch = useDispatch();

    const addPositions = async (data) => {
        return await dispatch(PositionsAdd(data)); // Trả về kết quả dispatch
    };

    const getPositions = async (config) => {
        return await dispatch(PositionsGet(config));
    };

    const updatePositions = async (data) => {
        return await dispatch(PositionsUpdate(data));
    };

    const deletePositions = async (id) => {
        return await dispatch(PositionsDelete(id));
    };

    const getPositionsById = async (id) => {
        return await dispatch(PositionsGetById(id));
    };

    const searchPositions = async (data) => {
        return await dispatch(PositionsSearch(data));
    };

    return {
        addPositions,
        getPositions,
        updatePositions,
        deletePositions,
        getPositionsById,
        searchPositions,
    };
};

export default usePositionsActions;
