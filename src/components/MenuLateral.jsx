import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import '../CSS/Menu.css'
import '../App.css';

const MenuLateral = () => {
  const [isSubMenuExtended, setIsSubMenuExtended] = useState(false);

  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      command: () => window.location.replace('/'),
    },
    {
      label: 'Cuentas',
      icon: 'pi pi-check',
      items: [
        { label: 'Ver cuentas', icon: 'pi pi-check' },
        {
          label: 'Iniciar sesion',
          icon: 'pi pi-check',
          command: () => window.location.replace('/Iniciar-sesion'),
        },
        {
          label: 'Registrar cuentas',
          icon: 'pi pi-times',
          command: () => window.location.replace('/Registrar'),
        }
      ],
    },
    {
      label: 'Productos',
      icon: 'pi pi-times',
      command: () => window.location.replace('/Productos'),
    },
    {
      label: 'Registros',
      icon: 'pi pi-times',
      command: () => window.location.replace('/'), // Recordar cambiar por ruta componentes
    },
    {
      label: 'Proveedores',
      icon: 'pi pi-times',
      command: () => window.location.replace('/'), // Recordar cambiar por ruta componentes
    },
  ];

  const handleMenuItemClick = () => {
    setIsSubMenuExtended(!isSubMenuExtended); // Invertir el estado al hacer clic en un elemento del submenú
  };

  return (
    <div className={`MenuLateral ${isSubMenuExtended ? 'submenu-extended' : ''}`}>
      <div className="title">Ai Zi</div>
      <div className="menu">
        <Menubar model={items} onChange={handleMenuItemClick} />
      </div>
    </div>
  );
};

export default MenuLateral;



