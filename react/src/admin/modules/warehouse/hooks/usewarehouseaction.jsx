import { useDispatch } from "react-redux";
import {
    warehouseImport,
    warehouseExport,
    getInventory,
    getWarehouseExport,
    getWarehouseImport,
    searchWarehouseExport,
    searchWarehouseImport,
    getImportDetail,
    getExportDetail,
    updateImport,
    updateExport,
    searchInventory,
    historyinventory,
    getInventoryDetail
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
    const searchWarehouseImportAction = async (data) => {
        return await dispatch(searchWarehouseImport(data));
    };
    const searchWarehouseExportAction = async (data) => {
        return await dispatch(searchWarehouseExport(data));
    };
    const getImportDetailAction = async (id) => {
        return await dispatch(getImportDetail(id));
    };
    const getExportDetailAction = async (id) => {
        return await dispatch(getExportDetail(id));
    };
    const updateImportAction = async (data) => {
        return await dispatch(updateImport(data));
    };
    const updateExportAction = async (data) => {
        return await dispatch(updateExport(data));
    };
    const searchInventoryAction = async (data) => {
        return await dispatch(searchInventory(data));
    }
    const getInventoryDetailAction = async (id) => {
        return await dispatch(getInventoryDetail(id));
    }
    const historyinventoryAction = async (data) => {
        return await dispatch(historyinventory(data));
    }

    return {
        warehouseGetImport,
        warehouseGetExport,
        warehouseImportAction,
        warehouseExportAction,
        getInventoryAction,
        searchWarehouseImportAction,
        searchWarehouseExportAction,
        getImportDetailAction,
        getExportDetailAction,
        updateImportAction,
        updateExportAction,
        searchInventoryAction,
        historyinventoryAction,
        getInventoryDetailAction
        
    };
};

export default usewarehouseAction;
