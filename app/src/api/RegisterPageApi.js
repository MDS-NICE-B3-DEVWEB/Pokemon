import { axiosInstance } from "./BaseAPI";

export const register = async (name, email, password ) => {
     const response = await axiosInstance.post('/register', name, email, password);
    return response.data;
}