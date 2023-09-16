import React, { useState } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
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
      icon: 'pi pi-users',
      items: [
        { label: 'Ver cuentas', icon: 'pi pi-eye' },
        {
          label: 'Iniciar sesion',
          icon: 'pi pi-user',
          command: () => window.location.replace('/Iniciar-sesion'),
        },
        {
          label: 'Registrar cuentas',
          icon: 'pi pi-user-plus',
          command: () => window.location.replace('/Registrar'),
        }
      ],
    },
    {
      label: 'Productos',
      icon: 'pi pi-qrcode',
      items: [
        {
          label: 'Ver Productos',
          icon: 'pi pi-eye',
          command: () => window.location.replace('/Productos'),
        },
        {
          label: 'Agregar Productos',
          icon: 'pi pi-plus',
          command: () => window.location.replace('/AgregarProductos'),
        }
      ],
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
        <PanelMenu model={items} className="w-full md:w-25rem" multiple={true} onChange={handleMenuItemClick} />
      </div>
    </div>
  );
};

export default MenuLateral;



