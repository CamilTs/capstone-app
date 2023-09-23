/* eslint-disable react/prop-types */
// En IniciarSesionPage.jsx (Componente de página)
// import { IniciarSesionForm } from '../IniciarSesion/components/IniciarSesionForm';

import { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { Content } from '../../../App';
import { useAuth } from '../../../context/AuthContext';

export const IniciarSesionPage = () => {
  const {login} = useAuth()
  const [formData, setFormData] = useState({
    rut: '',
    contrasena: ''
  });

  const messagesRef = useRef(null);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const submit = () => {
    login(formData.rut,formData.contrasena)
  };

  return (
    <Content width="40%" margin="auto">
      <h2>Iniciar Sesión</h2>
      <div style={{ display:'grid',placeContent:'center'}}>
        <span className="p-float-label">
          <InputText value={formData.rut} name="rut" onChange={handleChange} />
          <label htmlFor="rut">Rut</label>
        </span>
        <span className="p-float-label" style={{ marginTop: '25px' }}>
          <Password value={formData.contrasena} name="contrasena" onChange={handleChange} feedback={false} />
          <label style={{ textAlign: 'center' }} htmlFor="password">Contraseña</label>
        </span>
      </div>
      <div className="card flex justify-content-center">
        <Button 
            style={{ margin: 'auto' }} 
            label="Iniciar Sesión" 
            severity="success" 
            onClick={submit} 
        />
      </div>
      <p style={{ fontSize: '10px' }}>
        ¿Tienes problemas para iniciar sesión? Presiona <Link to="/registrar" style={{ color: 'blue' }}>aquí</Link>.
      </p>

      <Messages ref={messagesRef}/>
    </Content>
  );
};
