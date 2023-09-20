// import React, { useState } from 'react';
// import { InputText } from 'primereact/inputtext';
// import { Password } from 'primereact/password';
// import { Link } from 'react-router-dom';
// import { Button } from 'primereact/button';

// export const IniciarSesion = () => {
//   const [cargando, setCargando] = useState(false);

//   const estructuraInicio = {
//     usuario:'',
//     contrasena:''
//   }

//   const [formData, setFormData] = useState(estructuraInicio)
//   const handleChange = ({target}) => {
//     const {name, value} = target
//     setFormData({...formData,[name]:value})
//   }

//   const cargar = () => {
//     setCargando(true);
    
//     setTimeout(() => {
//       setCargando(false);
//       submit(); // Llamar a la función submit cuando cargando sea falso
//     }, 2000);
//   };
  
//   const submit = () => {
//     console.log(formData);
//   };

//   return (
//     <div className="p-card" style={{ background: 'white', padding: '20px' }}>
//       <h2>Iniciar Sesion</h2>
//       <div style={{padding:'10px'}}>
//         <span className="p-float-label">
//           <InputText value={formData.usuario} name='usuario' onChange={handleChange} />
//           <label htmlFor="usuario">Usuario</label>
//         </span>
//         <span className="p-float-label" style={{marginTop:'25px'}}>
//         <Password value={formData.contrasena} name='contrasena' onChange={handleChange} feedback={false} />
//         <label style={{textAlign:'center'}} htmlFor="password">Contraseña</label>
//         </span>
//       </div>
//       <div className="card flex justify-content-center">
//         <Button style={{margin:'auto'}} label='Iniciar Sesion' severity='success' loading={cargando} onClick={cargar}/>
//       </div>
//       <p style={{ fontSize: '10px' }}>
//         ¿Tienes problemas para iniciar sesión, presiona <Link to="/" style={{ color: 'blue' }}>aquí</Link>?
//       </p>
//     </div>
//   );
// };



