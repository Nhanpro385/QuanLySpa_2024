import Home from "../pages/Home";
import Appbooking from "../pages/Booking";
import BookingInfo from "../pages/BookingInfo";
import Pricingpage from "../pages/Pricingpage";
import VideoCall from "../pages/VideoCall";

const PublicRoutes = [
    { path: "/", element: <Home /> },
    { path: "/booking", element: <Appbooking /> },
    { path: "/bookinginfo", element: <BookingInfo /> },
    { path: "/pricing", element: <Pricingpage /> },
    { path: "/videocall/:idmeet", element: <VideoCall /> },
];

export { PublicRoutes };
