import axios from "axios";
import { enviroment } from "../../enviroment";

const header = {
  "Authorization": `Bearer ${localStorage.getItem("token")}` || "",
};
export const api = axios.create({
  baseURL: enviroment.API_URL + enviroment.PUERTO,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}` || "",
  },
});
