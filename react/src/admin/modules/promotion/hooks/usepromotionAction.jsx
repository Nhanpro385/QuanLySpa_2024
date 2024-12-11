import { useDispatch } from "react-redux";
import {
    promotionsGet,
    promotionsAdd,
    promotionsDelete,
    promotionsUpdate,
    promotionsGetById,
    promotionsearch,
    promotionGetClient
} from "@admin/redux/slices/promotionSlice";
const usePromotionActions = () => {
    const dispatch = useDispatch();
    const getPromotions = async (config) => {
        if (config) {
            return await dispatch(promotionsGet(config));
        }
        return await dispatch(promotionsGet());
    };
    const addPromotions = async (data) => {
        return await dispatch(promotionsAdd(data));
    };
    const deletePromotions = async (id) => {
        return await dispatch(promotionsDelete(id));
    };
    const updatePromotions = async (data) => {
        return await dispatch(promotionsUpdate(data));
    };
    const getPromotionsById = async (id) => {
        return await dispatch(promotionsGetById(id));
    };
    const searchPromotions = async (config) => {
        return await dispatch(promotionsearch(config));
    };
    const getClientPromotions = async (config) => {
        return await dispatch(promotionGetClient(config));
    };

    return {
        getPromotions,
        addPromotions,
        deletePromotions,
        updatePromotions,
        getPromotionsById,
        searchPromotions,
        getClientPromotions,
    };
};

export default usePromotionActions;
