import { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { RegistrarUsuarios } from "./components/RegistrarUsuarios";
import { RegistrarComercio } from "./components/RegistrarComercio";
import { VerRegistros } from "./components/VerRegistros";
import { ContenedorMasivo } from "./components/StyledComponents";
import { VerComercios } from "./components/VerComercios";
import { api } from "../../api/api";

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

const estructuraFormularioComercio = {
  nombre: "",
  direccion: "",
  propietario: "",
  telefono: "",
};

export const GestionarCuentas = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [estado, setEstado] = useState("crear"); // editar o crear
  const [formulario, setFormulario] = useState(estructuraFormulario);
  const [formularioComercio, setFormularioComercio] = useState(estructuraFormularioComercio);
  const [nombreCliente, setNombreCliente] = useState([]);
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

  const editarComercio = (comercio) => {
    setFormularioComercio({
      _id: comercio._id,
      nombre: comercio.nombre,
      direccion: comercio.direccion,
      propietario: comercio.propietario,
      telefono: comercio.telefono,
    });

    setEstado("editar");
    cambiarPestania(1);
  };

  const cambiarPestania = (pestaña) => {
    setActiveIndex(pestaña);
  };

  const traerUsuarios = async () => {
    try {
      const response = await api.get("rol/cliente");
      const { data } = response;
      console.log(data);
      const nombreCliente = data.data.map((usuario) => ({ id: usuario._id, nombre: usuario.nombre }));
      console.log(nombreCliente);
      setNombreCliente(nombreCliente);
    } catch (error) {
      console.log(error);
      console.log("Error al traer los usuarios");
    }
  };

  useEffect(() => {
    traerUsuarios();
  }, []);

  return (
    <ContenedorMasivo>
      <TabView
        style={{ padding: "0" }}
        activeIndex={activeIndex}
        onTabChange={(e) => {
          setFormulario(estructuraFormulario), setEstado("crear"), setActiveIndex(e.index), setFormularioComercio(estructuraFormularioComercio);
        }}
      >
        <TabPanel rightIcon="pi pi-user-plus ml-2" header="Registrar Cuenta">
          <RegistrarUsuarios
            estado={estado}
            estructuraFormulario={estructuraFormulario}
            formulario={formulario}
            setFormulario={setFormulario}
            cambiarPestania={cambiarPestania}
          />
        </TabPanel>
        <TabPanel rightIcon="pi pi-plus-circle ml-2" header="Registrar comercio">
          <RegistrarComercio
            estado={estado}
            estructuraFormulario={estructuraFormularioComercio}
            formulario={formularioComercio}
            setFormulario={setFormularioComercio}
            cambiarPestania={cambiarPestania}
            nombreCliente={nombreCliente}
          />
        </TabPanel>
        <TabPanel rightIcon="pi pi-users ml-2" header="Usuarios">
          <VerRegistros editarUsuario={editarUsuario} cambiarPestania={cambiarPestania} />
        </TabPanel>
        <TabPanel rightIcon="pi pi-briefcase ml-2" header="Comercios">
          <VerComercios editarComercio={editarComercio} cambiarPestania={cambiarPestania} nombreCliente={nombreCliente} />
        </TabPanel>
      </TabView>
    </ContenedorMasivo>
  );
};
