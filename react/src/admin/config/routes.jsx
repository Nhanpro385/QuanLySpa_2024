import Dashboard from "../pages/Dashboard";

// User Management
import User from "../pages/UserManagement/User";
import UserAdd from "../pages/UserManagement/User_add";
import HistoryService from "../pages/UserManagement/history_sevice";
import UserDetail from "../pages/UserManagement/UserDetail";

// Appointments
import Appointments from "../pages/appointments/Appointments";
import Appointments_Detail from "../pages/appointments/Appointments_Detail";

// Personnel Management
import Staffs from "../pages/Staff_management/Staffs";
import StaffsDetail from "../pages/Staff_management/StaffsDetail";

// Services
import Services from "../pages/services/Services";
import ServicesAdd from "../pages/services/add_services";

// Products
import Products from "../pages/product/Products";
import ProductsAdd from "../pages/product/product_add";
import ProductCategories from "../pages/product/product_categories";

// Warehouse
// import Warehouse from "../pages/Warehouse/Warehouse";
// import WarehouseImport from "../pages/Warehouse/product_import";
// import WarehouseExport from "../pages/Warehouse/Product_export";
// import ProductImportDetail from "../pages/Warehouse/product_import_detail";
// import ProductInventory from "../pages/Warehouse/product_inventory";

// Promotions
// import Promotions from "../pages/Promotions/Promotions";

// Consultant and Comments
// import Consultant from "../pages/consultant";
// import CommentManagement from "../pages/comment";

// Shift Management
// import ShiftManagement from "../pages/Shift Management";
// import ContactManagement from "../pages/contactmanagement";

const PublicRoutes = [
    // Dashboard
    { path: "/", element: <Dashboard /> },

    // User Management
    { path: "/user", element: <User /> },
    { path: "/user/add", element: <UserAdd /> },
    { path: "/user/history/:id", element: <HistoryService /> },
    { path: "/user/Detail/:id", element: <UserDetail /> },

    // Appointments
    { path: "/appointments", element: <Appointments /> },
    { path: "/appointments/detail/:id", element: <Appointments_Detail /> },

    // Personnel Management
    { path: "/staffs", element: <Staffs /> },
    { path: "/staffs/:id", element: <StaffsDetail /> },

    // Services
    { path: "/services", element: <Services /> },
    { path: "/services/add", element: <ServicesAdd /> },
    // Products
    { path: "/products", element: <Products /> },
    { path: "/products/add", element: <ProductsAdd /> },
    { path: "/product_categories", element: <ProductCategories /> },

    // Warehouse
    // { path: "/warehouse", element: <Warehouse /> },
    // { path: "/warehouse/import", element: <WarehouseImport /> },
    // { path: "/warehouse/import/:id", element: <ProductImportDetail /> },
    // { path: "/warehouse/export", element: <WarehouseExport /> },
    // { path: "/warehouse/inventory", element: <ProductInventory /> },
    // Promotions
    // { path: "/promotions", element: <Promotions /> },

    // Consultant and Comments
    // { path: "/consultant", element: <Consultant /> },
    // { path: "/CommentManagement", element: <CommentManagement /> },

    // Shift Management
    // { path: "/shifmanagement", element: <ShiftManagement /> },
    // Contact Management
    // {path: "/contactmanagement", element: <ContactManagement />},
];

export { PublicRoutes };
