import { useDispatch } from "react-redux";
import {
    usersGet,
    usersAdd,
    usersUpdate,
    usersDelete,
    usersGetById,
    userSearch,
    getUsersShift,
} from "@admin/redux/slices/UserSlice";
const useUsersActions = () => {
    const dispatch = useDispatch();

    const addusers = async (data) => {
        return await dispatch(usersAdd(data)); // Trả về kết quả dispatch
    };

    const getusers = async (config) => {
        if (!config) {
            return await dispatch(usersGet());
        }

        return await dispatch(usersGet(config));
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
    const searchusers = async (data) => {
        return await dispatch(userSearch(data));
    };
    const getstaffshift = async (config) => {
        if (!config) {
            return await dispatch(getUsersShift());
        }
        return await dispatch(getUsersShift(config));
    };
    return {
        addusers,
        getusers,
        updateusers,
        deleteusers,
        getusersById,
        searchusers,
        getstaffshift,
    };
};

export default useUsersActions;
