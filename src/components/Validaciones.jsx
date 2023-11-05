import * as Yup from "yup";

export const RegistrarSchema = Yup.object().shape({
  rut: Yup.string().required("Rut requerido").min(12, "Rut invalido"),
  nombre: Yup.string()
    .required("Nombre requerido")
    .min(1, "Nombre invalido")
    .max(40, "Nombre invalido")
    .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Nombre invalido"),
  apellido: Yup.string()
    .required("Apellido requerido")
    .min(1, "Apellido invalido")
    .max(40, "Apellido invalido")
    .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Apellido invalido"),
  correo: Yup.string()
    .required("Correo requerido")
    .email("Correo invalido")
    .min(1, "Correo invalido")
    .max(40, "Correo invalido")
    .matches(/\S+@\S+\.\S+/, "Correo invalido"),
  contrasena: Yup.string()
    .required("Contraseña requerida")
    .min(4, "Contraseña invalida")
    .max(40, "Contraseña invalida")
    .matches(/^[a-zA-Z0-9À-ÿ\s]{4,40}$/, "Contraseña invalida"),
  repetir: Yup.string()
    .required("Debe repetir la contraseña")
    .min(4, "Repetir contraseña invalida")
    .max(40, "Repetir contraseña invalida")
    .oneOf([Yup.ref("contrasena"), null], "Las contraseñas no coinciden"),
  imagen: Yup.string().required("Imagen requerida"),
  rol: Yup.string().required("Rol requerido"),
});
