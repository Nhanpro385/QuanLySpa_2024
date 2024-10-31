import Home from "../pages/Home";
import Appbooking from "../pages/Booking";
import BookingInfo from "../pages/BookingInfo";
import Pricingpage from "../pages/Pricingpage";
import VideoCall from "../pages/VideoCall";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Services from "../pages/Services";

const PublicRoutes = [
    { path: "/", element: <Home /> },
    { path: "/booking", element: <Appbooking /> },
    { path: "/bookinginfo", element: <BookingInfo /> },
    { path: "/pricing", element: <Pricingpage /> },
    { path: "/videocall/:idmeet", element: <VideoCall /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/services", element: <Services /> },
];

export { PublicRoutes };
