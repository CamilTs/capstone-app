import * as Yup from "yup";

// Registrar Usuario Validaciones //
export const RegistrarSchema = Yup.object().shape({
  rut: Yup.string().required("Rut requerido").min(11, "Rut invalido").max(12, "Rut invalido"),
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

// Registrar Comercio Validaciones //
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

// Registrar Producto Validaciones //
export const ProductoSchema = Yup.object().shape({
  nombre: Yup.string()
    .required("Nombre requerido")
    .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Nombre invalido"),
  codigo_barra: Yup.string().required("Código de barra requerido"),
  categoria: Yup.string().required("Categoría requerida"),
  imagen: Yup.string().required("Imagen requerida"),
  cantidad: Yup.number().required("Cantidad requerida").min(1, "La cantidad mínima es 1"),
  precio: Yup.number().required("Precio requerido").min(1, "El precio debe ser mayor a 0"),
});

// Registrar Mis Proveedores Validaciones //
export const ProveedorSchema = Yup.object().shape({
  nombre: Yup.string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .matches(/^[a-zA-Z ]+$/, "El nombre solo debe contener letras"),
  descripcion: Yup.string()
    .required("La descripcion es requerida")
    .min(10, "La descripcion debe tener al menos 10 caracteres")
    .max(200, "La descripcion debe tener maximo 200 caracteres")
    .matches(/^[a-zA-Z0-9 ]+$/, "La descripcion solo debe contener letras y numeros"),
  telefono: Yup.string()
    .required("El numero es requerido")
    .min(9, "El numero debe tener al menos 9 caracteres")
    .max(9, "El numero debe tener maximo 9 caracteres")
    .matches(/^[0-9]+$/, "El numero solo debe contener numeros"),
  correo: Yup.string().required("El correo es requerido").email("Ingrese un correo valido"),
});

// Registrar Publicación Validaciones //
export const publicacionSchema = Yup.object().shape({
  nombre: Yup.string()
    .required("Nombre requerido")
    .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Nombre invalido")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  precio: Yup.number().required("Precio requerido").min(1, "El precio debe ser mayor a 0"),
  codigo_barra: Yup.string()
    .required("Código de barra requerido")
    .matches(/^[a-zA-Z0-9]{1,40}$/, "Código de barra invalido"),
  categoria: Yup.string().required("Categoría requerida"),
  imagen: Yup.string().required("Imagen requerida"),
});

// Registrar Ticket Validaciones //
export const ticketSchema = Yup.object().shape({
  asunto: Yup.string()
    .required("Asunto requerido")
    .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Asunto invalido")
    .min(3, "El asunto debe tener al menos 3 caracteres"),
  descripcion: Yup.string()
    .required("Descripción requerida")
    .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, "Descripción invalida")
    .min(3, "La descripción debe tener al menos 3 caracteres"),
  usuarioID: Yup.string().required("Usuario requerido"),
});
