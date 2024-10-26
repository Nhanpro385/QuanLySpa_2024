import { useDispatch } from "react-redux";
import {
    usersGet,
    usersAdd,
    usersUpdate,
    usersDelete,
    usersGetById,
} from "@admin/redux/slices/UserSlice";
const useUsersActions = () => {
    const dispatch = useDispatch();

    const addusers = async (data) => {
        return await dispatch(usersAdd(data)); // Trả về kết quả dispatch
    };

    const getusers = async () => {
        return await dispatch(usersGet());
    };

    const updateusers = async (data) => {
        return await dispatch(usersUpdate(data));
    };

    const deleteusers = async (id) => {
        return await dispatch(usersDelete(id));
    };

    const getusersById = async (id) => {
        return await dispatch(usersGetById(id));
    };

    return {
        addusers,
        getusers,
        updateusers,
        deleteusers,
        getusersById,
    };
};

export default useUsersActions;
