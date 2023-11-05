import * as Yup from "yup";

export const RegistrarSchema = Yup.object().shape({
  rut: Yup.string().required("Rut requerido").min(12, "Rut invalido").max(12, "Rut invalido"),
  nombre: Yup.string()
    .required("Nombre requerido")
    .min(1, "Nombre invalido")
    .max(40, "Nombre invalido")
    .matches(/^[a-zA-Z\s]{1,40}$/, "Nombre invalido"),
  apellido: Yup.string()
    .required("Apellido requerido")
    .min(1, "Apellido invalido")
    .max(40, "Apellido invalido")
    .matches(/^[a-zA-Z\s]{1,40}$/, "Apellido invalido"),
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
    .matches(/^[a-zA-Z0-9\s]{4,40}$/, "Contraseña invalida"),
  repetir: Yup.string()
    .required("Debe repetir la contraseña")
    .min(4, "Repetir contraseña invalida")
    .max(40, "Repetir contraseña invalida")
    .oneOf([Yup.ref("contrasena"), null], "Las contraseñas no coinciden"),
  imagen: Yup.string().required("Imagen requerida"),
  rol: Yup.string().required("Rol requerido"),
});

export const ComercioSchema = Yup.object().shape({
  propietario: Yup.object().required("Propietario requerido").nullable(),
  nombre: Yup.string()
    .required("Nombre requerido")
    .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Nombre invalido"),
  direccion: Yup.string()
    .required("Dirección requerida")
    .matches(/^[a-zA-ZÀ-ÿ\s]/, "Dirección invalida"),
  telefono: Yup.string()
    .required("Teléfono requerido")
    .matches(/^[9]/, "Debe comenzar con 9")
    .matches(/^[0-9]{9}$/, "Teléfono invalido")
    .min(9, "Teléfono invalido")
    .max(9, "Teléfono invalido"),
});
