import axios from "axios";
import endpoints from "../config/appConfig";
export const API_login = async (email, password) => {
    try {
        const response = await axios.post(endpoints.Auth.login, {
            email,
            password,
        });
       
        
        if (response.access_token) {
            console.log(response.access_token);
            
            localStorage.setItem("token", response.access_token);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const API_logout = async () => {
    try {
        const response = await axios.post(endpoints.Auth.logout);
        return response.data;
    } catch (error) {
        throw error;
    }
};
