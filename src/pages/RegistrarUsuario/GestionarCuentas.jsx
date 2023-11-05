import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { RegistrarUsuarios } from "./components/RegistrarUsuarios";
import { RegistrarComercio } from "./components/RegistrarComercio";
import { VerRegistros } from "./components/VerRegistros";
import { ContenedorMasivo } from "./components/StyledComponents";

export const GestionarCuentas = () => {
  return (
    <ContenedorMasivo>
      <TabView style={{ padding: "0" }}>
        <TabPanel header="Registrar Cuenta">
          <RegistrarUsuarios />
        </TabPanel>
        <TabPanel header="Registrar Comercio">
          <RegistrarComercio />
        </TabPanel>
        <TabPanel header="Ver Usuarios">
          <VerRegistros />
        </TabPanel>
      </TabView>
    </ContenedorMasivo>
  );
};
