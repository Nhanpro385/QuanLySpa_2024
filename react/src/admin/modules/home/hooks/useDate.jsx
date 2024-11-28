import { useState } from "react";

// Hàm tính tuần ISO
const getISOWeek = (date) => {
    const target = new Date(date);
    target.setDate(target.getDate() - ((target.getDay() + 6) % 7) + 3);
    const firstThursday = new Date(target.getFullYear(), 0, 4);
    firstThursday.setDate(
        firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3
    );
    const weekNumber =
        Math.round((target - firstThursday) / (7 * 24 * 60 * 60 * 1000)) + 1;
    return weekNumber;
};

// Hàm tính tuần trong tháng
const getWeekOfMonth = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1); // Ngày đầu tháng
    const dayOfMonth = date.getDate(); // Ngày trong tháng
    const weekDayStart = startOfMonth.getDay(); // Ngày đầu tháng là thứ mấy (0 = CN)
    // Tính số tuần (cộng thêm nếu ngày đầu tháng không phải thứ 2)
    return Math.ceil((dayOfMonth + weekDayStart) / 7);
};

const useDate = (initialDate = new Date()) => {
    const [date, setDate] = useState(initialDate);

    // Định dạng ngày tháng năm theo `dd/MM/yyyy`
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const formatDate2 = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };
    return {
        formattedDate: formatDate(date), // Ngày định dạng kiểu dd/MM/yyyy
        formatDate2: formatDate2(date), // Ngày định dạng kiểu yyyy-MM-dd
        setDate, // Hàm thay đổi ngày
        day: date.getDate(), // Ngày
        month: date.getMonth() + 1, // Tháng (bắt đầu từ 1)
        year: date.getFullYear(), // Năm
        weekDay: date.getDay(), // Thứ trong tuần (0-6)
        isoWeek: getISOWeek(date), // Số tuần trong năm (ISO)
        weekOfMonth: getWeekOfMonth(date), // Số tuần trong tháng
    };
};

export default useDate;
