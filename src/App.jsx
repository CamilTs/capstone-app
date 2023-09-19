import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MenuLateral from './components/MenuLateral';
import { IniciarSesion } from './components/IniciarSesion';
import { RegistrarUsuarios } from './components/RegistrarUsuarios';
import { Productos } from './components/Productos';
import { AgregarProductos } from './components/AgregarProductos';
import { Principal } from './components/Principal';
import './App.css';
import './CSS/Menu.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import AgregarProveedores from './components/AgregarProveedores';

function App() {
  return (
    <Router>
      <div className="App">
        <MenuLateral />
        <div className="center-content">
          <Routes>
            <Route path="/Iniciar-sesion" element={<IniciarSesion />} />
            <Route path="/Registrar" element={<RegistrarUsuarios />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/AgregarProductos" element={<AgregarProductos />} />
            <Route path="/Proveedores" element={<AgregarProveedores />} />
            <Route path="/" element={<Principal />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;








