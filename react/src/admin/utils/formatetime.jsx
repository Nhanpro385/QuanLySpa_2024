const formatTime = (date) => {
    const d = new Date(date);

    const hours = `0${d.getHours()}`.slice(-2);
    const minutes = `0${d.getMinutes()}`.slice(-2);
    const seconds = `0${d.getSeconds()}`.slice(-2);

    return `${hours}:${minutes}:${seconds}`; // Trả về giờ, phút, giây
};

export default formatTime;
