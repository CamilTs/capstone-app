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
        <TabPanel rightIcon="pi pi-user-plus ml-2" header="Registrar Cuenta ">
          <RegistrarUsuarios />
        </TabPanel>
        <TabPanel rightIcon="pi pi-plus-circle ml-2" header="Registrar Comercio">
          <RegistrarComercio />
        </TabPanel>
        <TabPanel rightIcon="pi pi-search ml-2" header="Ver Usuarios">
          <VerRegistros />
        </TabPanel>
      </TabView>
    </ContenedorMasivo>
  );
};
