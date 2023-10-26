import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "no-autenticado", // cargando, autenticado, no-autenticado
    id: null,
    rut: null,
    nombre: null,
    apellido: null,
    correo: null,
    comercio: null,
    rol: null,
    token: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = "autenticado";
      state.id = payload.id;
      state.rut = payload.rut;
      state.nombre = payload.nombre;
      state.apellido = payload.apellido;
      state.correo = payload.correo;
      state.comercio = payload.comercio;
      state.rol = payload.rol;
      state.token = payload.token;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = "no-autenticado";
      state.id = null;
      state.rut = null;
      state.nombre = null;
      state.apellido = null;
      state.correo = null;
      state.comercio = null;
      state.rol = null;
      state.token = null;
      state.errorMessage = payload.errorMessage;
    },
    revisando: (state, { payload }) => {
      state.status = "cargando";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, revisando } = authSlice.actions;
