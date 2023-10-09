import axios from "axios";
import { useState } from "react";

const url = "http://localhost:3000";

export const api = axios.create({
  baseURL: url,
});

export const useApi = () => {
  const [loading, setLoading] = useState(false);

  const get = async (endpoint) => {
    setLoading(true);
    try {
      const response = await api.get(endpoint);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const post = async (endpoint, data) => {
    try {
      setLoading(true);
      const response = await api.post(endpoint, data);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
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
