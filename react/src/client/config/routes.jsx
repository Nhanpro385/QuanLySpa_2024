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

const PublicRoutes = [
    {
        path: "/",
        element: <Home />,
        requiredRole: { requiredRole: "public", role: "Client" },
    },
    {
        path: "/booking",
        element: <Appbooking />,
        requiredRole: { requiredRole: "private", role: "Client" },
    },
    {
        path: "/bookinginfo",
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
        path: "/tuvandatlich",
        element: <BookingConsultant />,
        requiredRole: { requiredRole: "private", role: "Client" },
    },
    {
        path: "/lichsudichvu",
        element: <ServiceHistory />,
        requiredRole: { requiredRole: "private", role: "Client" },
    },
];

export { PublicRoutes };
