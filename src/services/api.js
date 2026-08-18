import axios from "axios";

const API = axios.create({
  baseURL: "https://joinq-vda8.onrender.com",
});

export default API;