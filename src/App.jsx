import React, { useState } from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuLateral from './components/Menubar';


import { IniciarSesion } from './components/IniciarSesion'
import { RegistrarUsuarios } from './components/RegistrarUsuarios'

function App() {
  const [menuVisible, setMenuVisible] = useState(true);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <PrimeReactProvider>
      <Router>
          <div className={`MenuCard ${menuVisible ? '' : 'menu-hidden'}`}>
            <MenuLateral menuVisible={menuVisible} toggleMenu={toggleMenu} />
            <Routes>
              <Route path="/"/>
              <Route path="/Iniciar-sesion" element={<IniciarSesion />} />
              <Route path="/Registrar" element={<RegistrarUsuarios />} />
            </Routes>
          </div>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;

