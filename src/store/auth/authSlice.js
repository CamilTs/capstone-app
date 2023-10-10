import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "no-autenticado", // revisando-autenticacion, autenticado, no-autenticado
    user: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = "autenticado";
      state.user = payload.user;
    },
    logout: (state, { payload }) => {
      state.status = "no-autenticado";
      state.user = null;
    },
    revisando: (state, { payload }) => {
      state.status = "revisando-autenticacion";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, revisando } = authSlice.actions;
