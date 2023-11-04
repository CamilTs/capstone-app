import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { RegistrarUsuarios } from "./components/RegistrarUsuarios";
import { RegistrarComercio } from "./components/RegistrarComercio";
import { VerRegistros } from "./components/VerRegistros";

export const GestionarCuentas = () => {
  return (
    <div>
      <TabView>
        <TabPanel header="Registrar Cuenta">
          <RegistrarUsuarios />
        </TabPanel>
        <TabPanel header="Registrar Comercio">
          <RegistrarComercio />
        </TabPanel>
        <TabPanel header="Ver Registros">
          <VerRegistros />
        </TabPanel>
      </TabView>
    </div>
  );
};
