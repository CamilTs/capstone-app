import { revisando, login, logout } from "./authSlice";
import { api } from "../../api/api";

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
      console.log(data);

      if (!data.success) return dispatch(logout({ errorMessage: data.data }));
      localStorage.setItem("token", data.data.token);
      dispatch(login({ ...data.data }));
    } catch (error) {
      console.log(error);
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
    dispatch(revisando());
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) return dispatch(logout({ errorMessage: null }));

    try {
      const res = await api.post(`verificarToken`, { token });
      console.log(res);
      dispatch(login({ ...res.data.data }));
    } catch (error) {
      console.log(error);
      dispatch(logout({ errorMessage: error.message }));
    }
  };
};
