import Dashboard from "../pages/Dashboard";

// User Management
import Customer from "../pages/customerManagement/customer";
import CustomersAdd from "../pages/customerManagement/customer_add";
import HistoryService from "../pages/customerManagement/history_sevice";
import CustomerDetail from "../pages/customerManagement/UserDetail";

// Appointments
import Appointments from "../pages/appointments/Appointments";
import Appointments_Detail from "../pages/appointments/Appointments_Detail";

// Personnel Management / Staffs
import Staffs from "../pages/Staff_management/Staffs";
import StaffsDetail from "../pages/Staff_management/StaffsDetail";
import StaffAdd from "../pages/Staff_management/Staff_add";

// positions
import Positions from "../pages/Staff_management/positions";

// Services
import Services from "../pages/services/Services";
import ServicesAdd from "../pages/services/add_services";
import ServiceCategories from "../pages/services/Service_categories";
// Products
import Products from "../pages/product/Products";
import ProductsAdd from "../pages/product/product_add";
import ProductCategories from "../pages/product/product_categories";

// Warehouse
import Warehouse from "../pages/Warehouse/Warehouse";
import WarehouseImport from "../pages/Warehouse/product_import";
import WarehouseExport from "../pages/Warehouse/Product_export";
import ProductImportDetail from "../pages/Warehouse/product_import_detail";
import ProductInventory from "../pages/Warehouse/product_inventory";

// Promotions
import Promotions from "../pages/Promotions/Promotions";
import Promotions_add from "../pages/Promotions/Promotions_add";

// Consultant and Comments
import Consultant from "../pages/consultant";
import CommentManagement from "../pages/comment";

// Shift Management

import ShiftManagement from "../pages/ShiftManagement";
// Contact Management

import ContactManagement from "../pages/contactmanagement";
//patment
import PaymentManagement from "../pages/paymentManagenment";
// supplierManagement
import SupplierManagement from "../pages/supplierManagement";
const PublicRoutes = [
    // Dashboard
    { path: "/", element: <Dashboard /> },

    // User Management
    { path: "/khachhang", element: <Customer /> },
    { path: "/khachhang/them", element: <CustomersAdd /> },
    { path: "/khachhang/lichsugiaodich/:id", element: <HistoryService /> },
    { path: "/khachhang/chitiet/:id", element: <CustomerDetail /> },

    // Appointments
    { path: "/appointments", element: <Appointments /> },
    { path: "/appointments/detail/:id", element: <Appointments_Detail /> },

    // Personnel Management
    { path: "/nhanvien", element: <Staffs /> },
    { path: "/nhanvien/:id", element: <StaffsDetail /> },
    { path: "/nhanvien/them", element: <StaffAdd /> },
    // positions
    { path: "/nhanvien/chucvu", element: <Positions /> },
    // Services
    { path: "/services", element: <Services /> },
    { path: "/services/them", element: <ServicesAdd /> },
    {
        path: "/categoriesService",
        element: <ServiceCategories />,
    },
    // Products
    { path: "/products", element: <Products /> },
    { path: "/products/add", element: <ProductsAdd /> },
    { path: "/product_categories", element: <ProductCategories /> },

    // Warehouse
    { path: "/warehouse", element: <Warehouse /> },
    { path: "/warehouse/import", element: <WarehouseImport /> },
    { path: "/warehouse/import/:id", element: <ProductImportDetail /> },
    { path: "/warehouse/export", element: <WarehouseExport /> },
    { path: "/warehouse/inventory", element: <ProductInventory /> },
    // Promotions
    { path: "/promotions", element: <Promotions /> },
    { path: "/promotions/add", element: <Promotions_add /> },

    // Consultant and Comments
    { path: "/consultant", element: <Consultant /> },
    { path: "/CommentManagement", element: <CommentManagement /> },

    // Shift Management
    { path: "/shifmanagement", element: <ShiftManagement /> },
    // Contact Management
    { path: "/contactmanagement", element: <ContactManagement /> },
    // Payment Management
    { path: "/thanhtoan", element: <PaymentManagement /> },
    // supplierManagement
    {
        path: "/nhacungcap",
        element: <SupplierManagement />,
    },
];

export { PublicRoutes };
