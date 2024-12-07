import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development" ? "http://localhost:8000/api" : "/api",
  withCredentials: true,
});
console.log("Axios Base URL:", axiosInstance.defaults.baseURL);

export default axiosInstance;
