import Dashboard from "@admin/pages/home/Dashboard";

// User Management
import Customer from "@admin/pages/customerManagement/customer";
import CustomersAdd from "@admin/pages/customerManagement/customer_add";
import HistoryService from "@admin/pages/customerManagement/history_sevice";
import CustomerDetail from "@admin/pages/customerManagement/CustomerDetail";

// Appointments
import Appointments from "@admin/pages/appointments/Appointments";
import Appointments_Detail from "@admin/pages/appointments/Appointments_Detail";

// Personnel Management / Staffs
import Staffs from "@admin/pages/Staff_management/Staffs";
import StaffsDetail from "@admin/pages/Staff_management/StaffsDetail";
import StaffAdd from "@admin/pages/Staff_management/Staff_add";

// positions
import Positions from "@admin/pages/Staff_management/positions";

// Services
import Services from "@admin/pages/services/Services";
import ServicesAdd from "@admin/pages/services/add_services";
import ServiceCategories from "@admin/pages/services/Service_categories";
// Products
import Products from "@admin/pages/product/Products";
import ProductsAdd from "@admin/pages/product/product_add";
import ProductCategories from "@admin/pages/product/product_categories";

// Warehouse
import Warehouse from "@admin/pages/Warehouse/Warehouse";
import WarehouseImport from "@admin/pages/Warehouse/product_import";
import WarehouseExport from "@admin/pages/Warehouse/Product_export";
import ProductImportDetail from "@admin/pages/Warehouse/product_import_detail";
import ProductInventory from "@admin/pages/Warehouse/product_inventory";

// Promotions
import Promotions from "@admin/pages/Promotions/Promotions";
import Promotions_add from "@admin/pages/Promotions/Promotions_add";

// Consultant and Comments
import Consultant from "@admin/pages/consultant";
import CommentManagement from "@admin/pages/comment";

// Shift Management

import ShiftManagement from "@admin/pages/ShiftManagement";
// Contact Management

import ContactManagement from "@admin/pages/contact/contactmanagement";
//patment
import PaymentManagement from "@admin/pages/paymentManagenment";
// supplierManagement
import SupplierManagement from "@admin/pages/supplierManagement";
import Appointment_Add from "@admin/pages/appointments/Appointments_Add";
import Appointment_Edit from "@admin/pages/appointments/Appointments_Edit";
import StreatMents from "../pages/customerManagement/CustomerTreatments";
import StreatmentsAdd from "../pages/customerManagement/TreatmentsAdd";
import StreatmentsEdit from "../pages/customerManagement/CustomerTreatments_Edit";
import ProductServiceAdd from "../pages/services/ProductServiceAdd";
import Promotions_Edit from "../pages/Promotions/Promotions_Edit";
import VideocallAdmin from "../pages/videocall";
import Profile from "../pages/profile";
import Product_import_Edit from "../pages/Warehouse/product_import_Edit";
import ProductExportDetail from "../pages/Warehouse/product_export_detail";
import Product_export_Edit from "../pages/Warehouse/product_export_Edit";

const PublicRoutes = [
    // Dashboard
    {
        path: "/",
        element: <Dashboard />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },

    // User Management
    {
        path: "/khachhang",
        element: <Customer />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/khachhang/them",
        element: <CustomersAdd />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/khachhang/lichsutrilieu/:id",
        element: <HistoryService />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/khachhang/chitiet/:id",
        element: <CustomerDetail />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/khachhang/lichsutrilieu",
        element: <StreatMents />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/khachhang/lichsutrilieu/them",
        element: <StreatmentsAdd />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/khachhang/lichsutrilieu/chinhsua/:id",
        element: <StreatmentsEdit />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },

    // Appointments
    {
        path: "/lichhen",
        element: <Appointments />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/lichhen/them",
        element: <Appointment_Add />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/lichhen/chinhsua/:id",
        element: <Appointment_Edit />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },

    {
        path: "/nhanvien",
        element: <Staffs />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/nhanvien/:id",
        element: <StaffsDetail />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/nhanvien/them",
        element: <StaffAdd />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    // positions
    {
        path: "/nhanvien/chucvu",
        element: <Positions />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    // Services
    {
        path: "/dichvu",
        element: <Services />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/dichvu/them",
        element: <ServicesAdd />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/danhmucdichvu",
        element: <ServiceCategories />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/dichvu/themsanphamdichvu/:id",
        element: <ProductServiceAdd />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },

    // Products
    {
        path: "/products",
        element: <Products />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/products/add",
        element: <ProductsAdd />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/product_categories",
        element: <ProductCategories />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },

    // Warehouse
    {
        path: "/warehouse",
        element: <Warehouse />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/warehouse/import/Edit/:id",
        element: <Product_import_Edit />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/warehouse/export/Edit/:id",
        element: <Product_export_Edit />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/warehouse/import",
        element: <WarehouseImport />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/warehouse/import/detail/:id",
        element: <ProductImportDetail />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/warehouse/export/detail/:id",
        element: <ProductExportDetail />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/warehouse/export",
        element: <WarehouseExport />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/warehouse/inventory",
        element: <ProductInventory />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    // Promotions
    {
        path: "/khuyenmai",
        element: <Promotions />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/khuyenmai/them",
        element: <Promotions_add />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/khuyenmai/chinhsua/:id",
        element: <Promotions_Edit />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },

    // Consultant and Comments
    {
        path: "/tuvankhachhang",
        element: <Consultant />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    { path: "/CommentManagement", element: <CommentManagement /> },

    // Shift Management
    {
        path: "/shifmanagement",
        element: <ShiftManagement />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    // Contact Management
    {
        path: "/contactmanagement",
        element: <ContactManagement />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    // Payment Management
    {
        path: "/thanhtoan",
        element: <PaymentManagement />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    // supplierManagement
    {
        path: "/nhacungcap",
        element: <SupplierManagement />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/tuvankhachhang/videocall/:idmeet",
        element: <VideocallAdmin />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
    {
        path: "/thongtincanhan",
        element: <Profile />,
        requiredRole: { requiredRole: "private", role: "Admin" },
    },
];

export { PublicRoutes };
