import { useEffect, useState } from "react";
import { PanelMenu } from "primereact/panelmenu";
import "../CSS/Menu.css";
import "../App.css";
import { useNavigate } from "react-router-dom";

import { PerfilCard } from "./PerfilCard";
import { rutas } from "../rutas";
import { useAuth } from "../context/AuthContext";

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
          command: () => navigate("/proveedor"),
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
    <div className={`MenuLateral ${isSubMenuExtended ? "submenu-extended" : ""}`} style={{ width: "250px", minWidth: "250px" }}>
      <div className="title">Ai Zi</div>
      <div className="menu">
        <PanelMenu model={itemsRuta} className="w-full md:w-25rem" onChange={handleMenuItemClick} />
      </div>
      <PerfilCard />
    </div>
  );
};

export default MenuLateral;
