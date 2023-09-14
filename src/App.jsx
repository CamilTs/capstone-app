import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuLateral from '../components/Menubar';

import { IniciarSesion } from '../components/IniciarSesion'
import { RegistrarUsuarios } from '../components/RegistrarUsuarios'
import { Principal } from '../components/Principal';

function App() {
  return (
    <PrimeReactProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MenuLateral/>}/>
        <Route path="/Iniciar-sesion" element={<IniciarSesion/>} />
        <Route path="/Registrar" element={<RegistrarUsuarios/>} />
      </Routes>
    </Router>
    </PrimeReactProvider>
  );
}

export default App;
