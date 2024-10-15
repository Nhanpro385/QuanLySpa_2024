// utils/formatDate.js

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2); // Add leading zero for months
    const day = `0${d.getDate()}`.slice(-2); // Add leading zero for days
    return `${year}-${month}-${day}`;
};
export default formatDate;