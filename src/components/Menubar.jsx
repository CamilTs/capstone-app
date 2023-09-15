import React from 'react';
import { Menubar } from 'primereact/menubar';
<<<<<<< Updated upstream

const MenuLateral = () => {
=======
import '../App.css';

const MenuLateral = ({ menuVisible, toggleMenu }) => {
>>>>>>> Stashed changes
  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      command: () => window.location.replace('/'),
    },
    {
<<<<<<< Updated upstream
        label: 'Cuentas',
        icon: 'pi pi-check',
        items: [
          { label: 'Ver cuentas', icon: 'pi pi-check' },
          { label: 'Iniciar sesion', 
          icon: 'pi pi-check',
          command: () => window.location.replace('/Iniciar-sesion')
        },
          { label: 'Registrar cuentas', 
            icon: 'pi pi-times', 
            command: () => window.location.replace('/Registrar') },
        ],
      },
=======
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
        },
      ],
    },
>>>>>>> Stashed changes
    {
      label: 'Productos',
      icon: 'pi pi-times',
      command: () => window.location.replace('/'), // Recordar cambiar por ruta componentes
    },
    {
<<<<<<< Updated upstream
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

  return (
    <div className="MenuLateral">
      <div className="title">Ai-Zi</div>
      <div className="menu">
        <Menubar model={items} />
=======
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

  const handleToggleMenu = () => {
    toggleMenu();
  }

  const menuStyle = {
    width: menuVisible ? '250px' : '0',
    transition: 'width 0.3s ease-in-out',
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.8)',
    zIndex: '1',
    position: 'fixed',
    top: '0',
    left: '0',
  };

  const buttonStyle = {
    position: 'fixed',
    top: '10px',
    left: menuVisible ? '250px' : '10px',
    cursor: 'pointer',
    backgroundColor: 'rgb(3, 137, 146)',
    color: '#fff',
    borderRadius: '5px',
    padding: '5px 10px',
    width: '80px',
    transition: 'left 0.25s ease-in-out'
  };

  const titleStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    color: 'lightseagreen', // Cambia el color al color calipso deseado
    borderBottom: '2px solid lightseagreen', // Borde inferior calipso
    paddingBottom: '10px', // Espacio entre el título y el borde inferior
  };

  return (
    <div>
      <div style={menuStyle} className={`MenuLateral ${menuVisible ? '' : 'hidden'}`}>
      <div style={titleStyle}>Ai Zi</div>
        <div className="menu">
          <Menubar model={items} />
        </div>
      </div>
      <div
        style={buttonStyle}
        className={`toggle-button ${menuVisible ? '' : 'hidden'}`}
        onClick={handleToggleMenu}
      >
        {menuVisible ? 'Ocultar' : 'Mostrar'}
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

<<<<<<< Updated upstream
export default MenuLateral;

=======

export default MenuLateral;



>>>>>>> Stashed changes
