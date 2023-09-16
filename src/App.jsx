import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuLateral from './components/MenuLateral';
import { IniciarSesion } from './components/IniciarSesion';
import { RegistrarUsuarios } from './components/RegistrarUsuarios';
import './App.css';
import './CSS/Menu.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Productos } from './components/Productos';
import 'primeicons/primeicons.css';
import { AgregarProductos } from './components/AgregarProductos';

function App() {
  const [isMenuSelected, setIsMenuSelected] = useState(false);

  const handleMenuItemClick = () => {
    setIsMenuSelected(true);
  };

  const handleMenuClose = () => {
    setIsMenuSelected(false);
  };

  return (
    <Router>
      <div className="App">
        <MenuLateral
          isMenuSelected={isMenuSelected}
          handleMenuItemClick={handleMenuItemClick}
          handleMenuClose={handleMenuClose}
        />
        <div className={`center-content ${isMenuSelected ? 'menu-selected' : ''}`}>
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/Iniciar-sesion" element={<IniciarSesion />} />
            <Route path="/Registrar" element={<RegistrarUsuarios />} />
            <Route path="/Productos" element={<Productos/>} />
            <Route path='/AgregarProductos' element={<AgregarProductos/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;








