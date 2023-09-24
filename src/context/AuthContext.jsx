/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { cuentas } from "../cuentas";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (rut, contrasena) => {
    const usuarioEncontrado = cuentas.find((el) => el.rut == rut && el.contrasena == contrasena);

    setUser(usuarioEncontrado);
  };

  const logout = () => {
    setUser(null);
  };

  const signUp = (data) => {
    cuentas.push(data);
  };
  const verCuentas = () => {
    console.log(cuentas);
  };

  const contextValue = {
    user,
    login,
    logout,
    signUp,
    verCuentas,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
