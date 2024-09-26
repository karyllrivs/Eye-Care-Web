import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URI}/api`,
  withCredentials: true,
});

export default axiosClient;
