import axios from "axios";

// const BASE_URL = "http://localhost:5014/api/v1";
const BASE_URL = "https://lms-backend-s99f.onrender.com/api/v1";
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL=BASE_URL;
axiosInstance.defaults.withCredentials=true;

export default axiosInstance;
