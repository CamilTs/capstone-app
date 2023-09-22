import { useState } from "react";
import { PanelMenu } from "primereact/panelmenu";
import "../CSS/Menu.css";
import "../App.css";
import { useNavigate } from "react-router-dom";




const MenuLateral = () => {
  const [isSubMenuExtended, setIsSubMenuExtended] = useState(false);
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

  const handleMenuItemClick = () => {
    setIsSubMenuExtended(!isSubMenuExtended); // Invertir el estado al hacer clic en un elemento del submenú
  };

  return (
    <div
      className={`MenuLateral ${isSubMenuExtended ? "submenu-extended" : ""}`}
    >
      <div className="title">Ai Zi</div>
      <div className="menu">
        <PanelMenu
          model={items}
          className="w-full md:w-25rem"
          multiple={true}
          onChange={handleMenuItemClick}
        />
      </div>
    </div>
  );
};

export default MenuLateral;
