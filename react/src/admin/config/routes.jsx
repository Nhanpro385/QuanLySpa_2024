import Dashboard from "@admin/pages/Dashboard";

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

import ContactManagement from "@admin/pages/contactmanagement";
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


const PublicRoutes = [
    // Dashboard
    { path: "/", element: <Dashboard /> },

    // User Management
    { path: "/khachhang", element: <Customer /> },
    { path: "/khachhang/them", element: <CustomersAdd /> },
    { path: "/khachhang/lichsutrilieu/:id", element: <HistoryService /> },
    { path: "/khachhang/chitiet/:id", element: <CustomerDetail /> },
    { path: "/khachhang/lichsutrilieu", element: <StreatMents /> },
    { path: "/khachhang/lichsutrilieu/them", element: <StreatmentsAdd /> },
    {
        path: "/khachhang/lichsutrilieu/chinhsua/:id",
        element: <StreatmentsEdit />,
    },

    // Appointments
    { path: "/lichhen", element: <Appointments /> },
    { path: "/lichhen/them", element: <Appointment_Add /> },
    { path: "/lichhen/chinhsua/:id", element: <Appointment_Edit /> },
    { path: "/lichhen/chitiet/:id", element: <Appointments_Detail /> },

    // Personnel Management
    { path: "/nhanvien", element: <Staffs /> },
    { path: "/nhanvien/:id", element: <StaffsDetail /> },
    { path: "/nhanvien/them", element: <StaffAdd /> },
    // positions
    { path: "/nhanvien/chucvu", element: <Positions /> },
    // Services
    { path: "/dichvu", element: <Services /> },
    { path: "/dichvu/them", element: <ServicesAdd /> },
    {
        path: "/danhmucdichvu",
        element: <ServiceCategories />,
    },
    { path: "/dichvu/themsanphamdichvu/:id", element: <ProductServiceAdd /> },

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
