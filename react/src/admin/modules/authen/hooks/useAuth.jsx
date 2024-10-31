import { useDispatch } from "react-redux";
import {
    loginAdmin,
    logoutAdmin,
    forgotpassword,
    resetpassword,
} from "@admin/redux/slices/authSlice";
const useAuthActions = () => {
    const dispatch = useDispatch();

    const authLogin = async (email, password) => {
        return await dispatch(loginAdmin({ email, password }));
    };

    const authLogout = async () => {
        return await dispatch(logoutAdmin());
    };
    const authForgot = async (data) => {
        return await dispatch(forgotpassword(data));
    };
    const authReset = async (data) => {
        return await dispatch(resetpassword(data));
    };
    return {
        authLogin,
        authLogout,
        authForgot,
        authReset,
    };
};

export default useAuthActions;
