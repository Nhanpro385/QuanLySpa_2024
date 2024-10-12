import { useDispatch } from "react-redux";
import {
    PositionsGet,
    PositionsAdd,
    PositionsUpdate,
    PositionsDelete,
    PositionsGetById,
} from "../../../redux/slices/PositionsSlice";
const usePositionsActions = () => {
    const dispatch = useDispatch();

    const addPositions = async (data) => {
        return await dispatch(PositionsAdd(data)); // Trả về kết quả dispatch
    };

    const getPositions = async () => {
        return await dispatch(PositionsGet());
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

    return {
        addPositions,
        getPositions,
        updatePositions,
        deletePositions,
        getPositionsById,
    };
};

export default usePositionsActions;
