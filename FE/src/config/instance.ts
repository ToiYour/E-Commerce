import { refreshToken } from "@/services/auth";
import { getItemLocal, setItemLocal } from "@/services/localStorageService";
import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env.SERVER}/api`,
  timeout: 5000,
  withCredentials: true,
});
// Đón chặn các req trước khi gửi đi kèm token nếu có
instance.interceptors.request.use(
  (config) => {
    const token = getItemLocal("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Đón chặn các res trước khi trả về
instance.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response?.status === 401) {
      const { data } = await refreshToken();
      setItemLocal("token", data.access_token);
      error.config.headers["Authorization"] = `Bearer ${data.access_token}`;
      return instance(error.config);
    }
    return Promise.reject(error);
  }
);

export default instance;
