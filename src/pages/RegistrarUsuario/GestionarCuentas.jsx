import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { RegistrarUsuarios } from "./components/RegistrarUsuarios";
import { RegistrarComercio } from "./components/RegistrarComercio";
import { VerRegistros } from "./components/VerRegistros";
import { ContenedorMasivo } from "./components/StyledComponents";

const estructuraFormulario = {
  rut: "",
  nombre: "",
  apellido: "",
  correo: "",
  contrasena: "",
  repetir: "",
  imagen: "",
  rol: "",
};

export const GestionarCuentas = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [estado, setEstado] = useState("crear"); // editar o crear
  const [formulario, setFormulario] = useState(estructuraFormulario);
  const editarUsuario = (usuario) => {
    setFormulario({
      _id: usuario._id,
      rut: usuario.rut,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      imagen: usuario.imagen,
      rol: usuario.rol,
    });

    setEstado("editar");
    cambiarPestania(0);
  };

  const cambiarPestania = (pestaña) => {
    setActiveIndex(pestaña);
  };

  return (
    <ContenedorMasivo>
      <TabView
        style={{ padding: "0" }}
        activeIndex={activeIndex}
        onTabChange={(e) => {
          setFormulario(estructuraFormulario), setEstado("crear"), setActiveIndex(e.index);
        }}
      >
        <TabPanel rightIcon="pi pi-user-plus ml-2" header="Registrar Cuenta ">
          <RegistrarUsuarios estado={estado} estructuraFormulario={estructuraFormulario} formulario={formulario} setFormulario={setFormulario} />
        </TabPanel>
        <TabPanel rightIcon="pi pi-plus-circle ml-2" header="Comercio">
          <RegistrarComercio />
        </TabPanel>
        <TabPanel rightIcon="pi pi-search ml-2" header="Administrar">
          <VerRegistros editarUsuario={editarUsuario} cambiarPestania={cambiarPestania} />
        </TabPanel>
      </TabView>
    </ContenedorMasivo>
  );
};
