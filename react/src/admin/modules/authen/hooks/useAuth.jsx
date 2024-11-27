import { useDispatch } from "react-redux";
import {
    loginAdmin,
    logoutAdmin,
    forgotpassword,
    resetpassword,
    GetmeAdmin,
    loginClient,
    registerClient,
    logoutClient,
    forgotpasswordClient,
    resetpasswordClient,
    GetmeClient,
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
    const authGetmeAdmin = async () => {
        return await dispatch(GetmeAdmin());
    };
    const authLoginClient = async (email, password) => {
        return await dispatch(loginClient({ email, password }));
    };
    const authRegisterClient = async (data) => {
        return await dispatch(registerClient(data));
    };
    const authLogoutClient = async () => {
        return await dispatch(logoutClient());
    };
    const authForgotClient = async (data) => {
        return await dispatch(forgotpasswordClient(data));
    };
    const authResetClient = async (data) => {
        return await dispatch(resetpasswordClient(data));
    };

    return {
        authLogin,
        authLogout,
        authForgot,
        authReset,
        authGetmeAdmin,
        authLoginClient,
        authRegisterClient,
        authLogoutClient,
        authForgotClient,
        authResetClient,
    };
};

export default useAuthActions;
