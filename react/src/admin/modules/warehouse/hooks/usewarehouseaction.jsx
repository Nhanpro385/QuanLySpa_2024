import { useDispatch } from "react-redux";
import {
    warehouseImport,
    warehouseExport,
    getInventory,
    getWarehouse,
} from "@admin/redux/slices/warehouseSlice";
const usewarehouseAction = () => {
    const dispatch = useDispatch();
    const importWarehouse = async (data) => {
        return dispatch(warehouseImport(data));
    };
    const exportWarehouse = async (data) => {
        return dispatch(warehouseExport(data));
    };
    const getInventoryAction = async () => {
        return dispatch(getInventory());
    };
    const getWarehouseAction = async () => {
        return dispatch(getWarehouse());
    };
    return {
        importWarehouse,
        exportWarehouse,
        getInventoryAction,
        getWarehouseAction,
    };
};

export default usewarehouseAction;
