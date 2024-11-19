import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const calculateEndTime = (appointment_date, start_time, expected_time) => {
    // Kết hợp ngày và giờ bắt đầu
    const startDateTime = dayjs(
        `${appointment_date} ${start_time}`,
        "YYYY-MM-DD HH:mm:ss"
    );

    // Tách thời gian dự kiến thành giờ, phút, giây
    const [hours, minutes, seconds] = expected_time.split(":").map(Number);

    // Tính tổng thời gian dự kiến dưới dạng duration
    const expectedDuration = dayjs.duration({
        hours,
        minutes,
        seconds,
    });

    // Cộng duration vào startDateTime
    const endDateTime = startDateTime.add(expectedDuration);

    return endDateTime.format("DD/MM/YYYY HH:mm:ss");
};

export default calculateEndTime;
