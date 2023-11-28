import axios from "axios";
import { useState } from "react";

const url = "https://capstone-api-mhrj.onrender.com/";

export const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}` || "",
  },
});

export const useApi = () => {
  const [loading, setLoading] = useState(false);

  const get = async (endpoint) => {
    console.log(endpoint);
    setLoading(true);
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const post = async (endpoint, data) => {
    setLoading(true);
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    get,
    loading,
    post,
  };
};
