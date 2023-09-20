// En IniciarSesionPage.jsx (Componente de página)
import { IniciarSesionForm } from '../IniciarSesion/components/IniciarSesionForm';

export const IniciarSesionPage = () => {
  const handleSubmit = (formData) => {
    console.log('Datos de inicio de sesión:', formData);
  };

  return (
    <div>
      <IniciarSesionForm onSubmit={handleSubmit} />
    </div>
  );
};
