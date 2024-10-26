import { useDispatch } from "react-redux";
import { loginAdmin, logoutAdmin } from "@admin/redux/slices/authSlice";
const useAuthActions = () => {
    const dispatch = useDispatch();

    const authLogin = async (email, password) => {
        return await dispatch(loginAdmin({ email, password }));
    };

    const authLogout = async () => {
        return await dispatch(logoutAdmin());
    };

    return {
        authLogin,
        authLogout,
    };
};

export default useAuthActions;
