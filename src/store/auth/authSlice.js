import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "no-autenticado", // revisando-autenticacion, autenticado, no-autenticado
    rut: null,
    nombre: null,
    apellido: null,
    email: null,
    rol: null,
    token: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload }) => {
      console.log(payload);
      state.status = "autenticado";
      state.rut = payload.rut;
      state.nombre = payload.nombre;
      state.apellido = payload.apellido;
      state.email = payload.email;
      state.rol = payload.rol;
      state.token = payload.token;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      console.log(payload);
      state.status = "no-autenticado";

      state.rut = null;
      state.nombre = null;
      state.apellido = null;
      state.email = null;
      state.rol = null;
      state.token = null;
      state.errorMessage = payload.errorMessage;
    },
    revisando: (state, { payload }) => {
      state.status = "revisando-autenticacion";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, revisando } = authSlice.actions;
