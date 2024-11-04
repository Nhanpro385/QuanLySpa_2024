import { useDispatch } from "react-redux";
import {
    commentsGet,
    commentsAdd,
    commentsUpdate,
    commentsDelete,
    commentsGetById,
    replyComment,
} from "@admin/redux/slices/CommentsSlice";
const usecommentsActions = () => {
    const dispatch = useDispatch();

    const addcomments = async (data) => {
        return await dispatch(commentsAdd(data)); // Trả về kết quả dispatch
    };

    const getcomments = async () => {
        return await dispatch(commentsGet());
    };

    const updatecomments = async (data) => {
        return await dispatch(commentsUpdate(data));
    };

    const deletecomments = async (id) => {
        return await dispatch(commentsDelete(id));
    };

    const getcommentsById = async (id) => {
        return await dispatch(commentsGetById(id));
    };
    const replycomments = async (data) => {
        console.log("data", data);
        
        return await dispatch(replyComment(data));
    };

    return {
        addcomments,
        getcomments,
        updatecomments,
        deletecomments,
        getcommentsById,
        replycomments,
    };
};

export default usecommentsActions;