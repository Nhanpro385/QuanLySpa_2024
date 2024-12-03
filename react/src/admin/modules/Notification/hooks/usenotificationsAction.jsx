import { useDispatch } from "react-redux";
import { notificationsGet } from "@admin/redux/slices/NotificationSlice";
const usenotificationsActions = () => {
    const dispatch = useDispatch();

    const getnotification = async (config) => {
        if (config) {
            return await dispatch(notificationsGet(config));
        }
        return await dispatch(notificationsGet());
    };

    return { getnotification };
};

export default usenotificationsActions;
