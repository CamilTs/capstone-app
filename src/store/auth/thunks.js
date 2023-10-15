import { revisando, login, logout } from "./authSlice";
import { api } from "../../api/api";

export const revisandoAutentication = (rut, contrasena) => {
  return async (dispatch) => {
    dispatch(revisando());
  };
};

export const autenticado = (rut, contrasena) => {
  return async (dispatch) => {
    dispatch(revisando(rut, contrasena));
    try {
      const response = await api.post("/login", { rut, contrasena });
      if (response.data.success) {
        const usuarioAutenticado = response.data.user;

        dispatch(login({ user: usuarioAutenticado }));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
