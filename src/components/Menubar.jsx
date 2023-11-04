import React from "react";
import { Menubar } from "primereact/menubar";

const MenuLateral = () => {
  const items = [
    {
      label: "Inicio",
      icon: "pi pi-home",
      command: () => window.location.replace("/"),
    },
    {
      label: "Cuentas",
      icon: "pi pi-check",
      items: [
        { label: "Ver cuentas", icon: "pi pi-check" },
        { label: "Iniciar sesion", icon: "pi pi-check", command: () => window.location.replace("/Iniciar-sesion") },
        { label: "Registrar cuentas", icon: "pi pi-times", command: () => window.location.replace("/Registrar") },
      ],
    },
    {
      label: "Productos",
      icon: "pi pi-times",
      command: () => window.location.replace("/"), // Recordar cambiar por ruta componentes
    },
    {
      label: "Registros",
      icon: "pi pi-times",
      command: () => window.location.replace("/"), // Recordar cambiar por ruta componentes
    },
    {
      label: "Proveedores",
      icon: "pi pi-times",
      command: () => window.location.replace("/"), // Recordar cambiar por ruta componentes
    },
  ];

  return (
    <div className="MenuLateral">
      <div className="title">Ai-Zi</div>
      <div className="menu">
        <Menubar model={items} />
      </div>
    </div>
  );
};

export default MenuLateral;
