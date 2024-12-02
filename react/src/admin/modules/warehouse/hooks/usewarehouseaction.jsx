import { useDispatch } from "react-redux";
import {
    warehouseImport,
    warehouseExport,
    getInventory,
    getWarehouseExport,
    getWarehouseImport,
} from "@admin/redux/slices/warehouseSlice";
const usewarehouseAction = () => {
    const dispatch = useDispatch();
    const warehouseGetImport = async () => {
        return await dispatch(getWarehouseImport());
    };
    const warehouseGetExport = async () => {
        return await dispatch(getWarehouseExport());
    };
    const warehouseImportAction = async (data) => {
        return await dispatch(warehouseImport(data));
    };
    const warehouseExportAction = async (data) => {
        return await dispatch(warehouseExport(data));
    };
    const getInventoryAction = async () => {
        return await dispatch(getInventory());
    };
    return {
        warehouseGetImport,
        warehouseGetExport,
        warehouseImportAction,
        warehouseExportAction,
        getInventoryAction,
    };
};

export default usewarehouseAction;
