import { useDispatch } from "react-redux";
import {
    getContactAdmin,
    getContactDetail,
    createContactAdmin,
    createContactClient,
    updateContactAdmin,
    searchContactAdmin,
} from "@admin/redux/slices/contactSlice";

const useContactActions = () => {
    const dispatch = useDispatch();

    const fetchContacts = async () => await dispatch(getContactAdmin());
    const fetchContactById = async (id) =>
        await dispatch(getContactDetail(id));
    const createAdminContact = async (data) =>
        await dispatch(createContactAdmin(data));
    const createClientContact = async (data) =>
        await dispatch(createContactClient(data));
    const updateAdminContact = async (data) =>
        await dispatch(updateContactAdmin(data));
    const searchContacts = async (data) =>
        await dispatch(searchContactAdmin(data));

    return {
        fetchContacts,
        fetchContactById,
        createAdminContact,
        createClientContact,
        updateAdminContact,
        searchContacts,
    };
};

export default useContactActions;
