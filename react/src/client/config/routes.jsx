import Home from "../pages/Home";
import Appbooking from "../pages/Booking";
import BookingInfo from "../pages/BookingInfo";
import Pricingpage from "../pages/Pricingpage";
import VideoCall from "../pages/VideoCall";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Services from "../pages/Services";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import NewPassword from "../pages/NewPassword/NewPassword";
import Profile from "../pages/Profile/Profile";
import BookingConsultant from "../pages/BookingConsultant/BookingConsultant";
import ServiceHistory from "../pages/ServiceHistory/ServiceHistory";
import servicesDetailbyid from "../modules/Services/components/servicesDetailbyid";
import ServicesDetailById from "../modules/Services/components/servicesDetailbyid";
import AboutUs from "../pages/AboutUs/AboutUs";
import ThanksBooking from "../pages/thanksBooking";
import StreatmentsHistory from "../modules/Profile/components/streatmentsHistory";
import Promotion from "../pages/Promotion/Promotion";

const PublicRoutes = [
    {
        path: "/",
        element: <Home />,
        requiredRole: { requiredRole: "public", role: "Client" },
    },
    {
        path: "/trangchu",
        element: <Home />,
        requiredRole: { requiredRole: "public", role: "Client" },
    },
    {
        path: "/datlichhen",
        element: <Appbooking />,
        requiredRole: { requiredRole: "private", role: "Client" },
    },
    {
        path: "/thongtindatlich",
        element: <BookingInfo />,
        requiredRole: { requiredRole: "private", role: "Client" },
    },
    {
        path: "/pricing",
        element: <Pricingpage />,
        requiredRole: { requiredRole: "public", role: "Client" },
    },
    {
        path: "/tuvankhachhang/videocall/:idmeet",
        element: <VideoCall />,
        requiredRole: { requiredRole: "private", role: "Client" },
    },
    {
        path: "/dangnhap",
        element: <Login />,
        requiredRole: { requiredRole: "public", role: "Client" },
    },
    {
        path: "/dangky",
        element: <Register />,
        requiredRole: { requiredRole: "public", role: "Client" },
    },
    {
        path: "/dichvu",
        element: <Services />,
        requiredRole: { requiredRole: "public", role: "Client" },
    },
    {
        path: "/dichvu/:id",
        element: <ServicesDetailById />,
        requiredRole: { requiredRole: "public", role: "Client" },
    },
    {
        path: "/quenmatkhau",
        element: <ForgotPassword />,
        requiredRole: { requiredRole: "public", role: "Client" },
    },
    {
        path: "/matkhaumoi",
        element: <NewPassword />,
        requiredRole: { requiredRole: "public", role: "Client" },
    },
    {
        path: "/thongtincanhan",
        element: <Profile />,
        requiredRole: { requiredRole: "private", role: "Client" },
    },
    {
        path: "/thongtincanhan/tuvandatlich",
        element: <BookingConsultant />,
        requiredRole: { requiredRole: "private", role: "Client" },
    },
    {
        path: "/thongtincanhan/lichsudichvu",
        element: <ServiceHistory />,
        requiredRole: { requiredRole: "private", role: "Client" },
    },
    {
        path: "/thongtincanhan/lichsudieutri",
        element: <StreatmentsHistory />,
        requiredRole: { requiredRole: "private", role: "Client" },
    },
    {
        path: "/gioithieu",
        element: <AboutUs />,
        requiredRole: { requiredRole: "public", role: "Client" },
    },
    {
        path: "/datlich/thanhcong",
        element: <ThanksBooking />,
        requiredRole: { requiredRole: "private", role: "Client" },
    },
    {
        path: "/khuyenmai",
        element: <Promotion />,
        requiredRole: { requiredRole: "public", role: "Client" },
    },
];

export { PublicRoutes };
