import React from "react";

import BookingConsultantPage from "../../modules/Profile/components/BookingConsultant";

const BookingConsultant = () => {
    document.title = "Danh sách lịch Tư vấn";
    return (
        <div>
            <BookingConsultantPage />
        </div>
    );
};

export default BookingConsultant;
