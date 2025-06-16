import axios from "axios";

const instance = axios.create({
  baseURL: "https://noted-backend-five.vercel.app/api",
});

export default instance;
