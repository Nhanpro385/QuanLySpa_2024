//This is the Auth token, you will use it to generate a meeting and connect to it

const API_BASE_URL = "https://api.videosdk.live"; // URL của API của Videosdk
export const VIDEOSDK_TOKEN = import.meta.env.VITE_TOKKEN_VIDEOCALL;

export const createMeeting = async ({ token }) => {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
        method: "POST",
        headers: {
            authorization: `${VIDEOSDK_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });
    //Destructuring the roomId from the response
    const { roomId } = await res.json();
    return roomId;
};
export const getToken = async () => {
    if (VIDEOSDK_TOKEN && API_AUTH_URL) {
        console.error(
            "Lỗi: Chỉ cung cấp MỘT THÔNG SỐ - API mã thông báo hoặc API xác thực"
        );
    } else if (VIDEOSDK_TOKEN) {
        return VIDEOSDK_TOKEN;
    } else if (API_AUTH_URL) {
        const res = await fetch(`${API_AUTH_URL}/get-token`, {
            method: "GET",
        });
        const { token } = await res.json();
        return token;
    } else {
        console.error(
            "Lỗi: ",
            Error("Vui lòng thêm mã thông báo hoặc URL máy chủ xác thực")
        );
    }
};
export const validateMeeting = async ({ roomId, token }) => {
    // Hàm này sẽ kiểm tra xem cuộc họp có tồn tại không
    const url = `${API_BASE_URL}/v2/rooms/validate/${roomId}`;

    const options = {
        method: "GET",
        headers: { Authorization: token, "Content-Type": "application/json" },
    };

    const response = await fetch(url, options);

    if (response.status === 400) {
        const data = await response.text();

        return { meetingId: null, err: data };
    }

    const data = await response.json();

    if (data.roomId) {
        return { meetingId: data.roomId, err: null };
    } else {
        return { meetingId: null, err: data.error };
    }
};
