import { useEffect, useState } from "react";
import { PanelMenu } from "primereact/panelmenu";
import { useNavigate } from "react-router-dom";

import { PerfilCard } from "./PerfilCard";
import { rutas } from "../rutas";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

const Fondo = styled.div`
  width: 250px;
  height: 100%;
  background-color: #fff;
  color: #fff;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.8);
  padding: 20px;
  transition: height 0.3s ease-in-out;
  }
`;

const MenuEstilo = styled.div`
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.35);
  background: #538a95;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: rgb(255, 255, 255);
  padding-bottom: 10px;
`;

const MenuLateral = () => {
  const [isSubMenuExtended, setIsSubMenuExtended] = useState(false);
  const [itemsRuta, setItemsRuta] = useState([]);
  const { user } = useAuth();
  let itemsPrueba = [];
  const navigate = useNavigate();
  const items = [
    {
      label: "Inicio",
      icon: "pi pi-home",
      command: () => {
        navigate("/cliente/");
      },
    },
    {
      label: "Cuentas",
      icon: "pi pi-users",
      items: [
        { label: "Ver cuentas", icon: "pi pi-eye" },
        {
          label: "Iniciar sesion",
          icon: "pi pi-user",
          command: () => navigate("/iniciar-sesion"),
        },
        {
          label: "Registrar cuentas",
          icon: "pi pi-user-plus",
          command: () => navigate("/admin/registrar"),
        },
      ],
    },

    {
      label: "Productos",
      icon: "pi pi-qrcode",
      items: [
        {
          label: "Ver Productos",
          icon: "pi pi-eye",
          command: () => navigate("/cliente/productos"),
        },
        {
          label: "Agregar Productos",
          icon: "pi pi-plus",
          command: () => navigate("/admin/agregarProductos"),
        },
      ],
    },
    {
      label: "Registros",
      icon: "pi pi-times",
      command: () => navigate("/cliente"),
    },
    {
      label: "Proveedores",
      icon: "pi pi-truck",
      items: [
        {
          label: "Ver proveedores",
          icon: "pi pi-eye",
          command: () => navigate("/productos"),
        },
      ],
    },
    {
      label: "Proveedores",
      icon: "pi pi-truck",
      items: [
        {
          label: "Agregar productos",
          icon: "pi pi-eye",
          command: () => navigate("/proveedor/agregarProductos"),
        },
      ],
    },
    {
      label: "Proveedores",
      icon: "pi pi-truck",
      items: [
        {
          label: "Mis productos",
          icon: "pi pi-eye",
          command: () => navigate("/proveedor/verProductos"),
        },
      ],
    },
  ];
  const prueba = () => {
    itemsPrueba = rutas
      .filter((el) => el.rol == user.rol)
      .map((el) => {
        return {
          label: el.label,
          icon: el.icono,
          command: () => {
            navigate(el.ruta);
          },
        };
      });
    setItemsRuta(itemsPrueba);
  };

  const handleMenuItemClick = () => {
    setIsSubMenuExtended(!isSubMenuExtended); // Invertir el estado al hacer clic en un elemento del submenú
  };

  useEffect(() => {
    prueba();
  }, []);

  return (
    <Fondo style={{ width: "250px", minWidth: "250px" }}>
      <MenuEstilo>Ai Zi</MenuEstilo>
      <div className="menu">
        <PanelMenu model={itemsRuta} className="w-full md:w-25rem" onChange={handleMenuItemClick} />
        <PerfilCard />
      </div>
    </Fondo>
  );
};

export default MenuLateral;
