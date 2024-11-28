import { useDispatch } from "react-redux";
import { notificationsGet } from "@admin/redux/slices/NotificationSlice";
const usenotificationsActions = () => {
    const dispatch = useDispatch();

    const getnotification = async () => {
        return await dispatch(notificationsGet());
    };

    return { getnotification };
};

export default usenotificationsActions;
