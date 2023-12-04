import { revisando, login, logout } from "./authSlice";
import { api } from "../../api/api";
import jwt_decode from "jwt-decode";
export const revisandoAutentication = (rut, contrasena) => {
  return async (dispatch) => {
    dispatch(revisando());
  };
};

export const autenticando = ({ rut, contrasena }) => {
  return async (dispatch) => {
    dispatch(revisando());
    try {
      const response = await api.post("autenticacion/login", { rut, contrasena });
      const { data } = response;

      if (!data.success) {
        dispatch(logout({ errorMessage: "Usuario no autorizado" }));
        return "Usuario no autorizado";
      }

      localStorage.setItem("token", data.data.token);
      dispatch(login({ ...data.data }));
      return null;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };
};

export const cerrarSesion = () => {
  return async (dispatch) => {
    dispatch(revisando());
    try {
      localStorage.removeItem("token");
      dispatch(logout({ errorMessage: null }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const checkAuthToken = () => {
  return async (dispatch) => {
    try {
      dispatch(revisando());

      const token = localStorage.getItem("token");
      if (!token) return dispatch(logout({ errorMessage: null }));
      const decoded = jwt_decode(token);
      const { exp } = decoded;
      const currentTime = Math.floor(Date.now() / 1000);
      if (exp <= currentTime) {
        localStorage.removeItem("token");

        return dispatch(logout({ errorMessage: null }));
      }

      dispatch(login({ ...decoded }));
    } catch (error) {
      console.log(error);
      dispatch(logout({ errorMessage: error.message }));
    }
  };
};
