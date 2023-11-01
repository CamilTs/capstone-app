import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputContainer } from "./InputContainer";
import { useFormik } from "formik";
import {
  Formulario,
  InputRow,
  Inputs,
  Campos,
  ContenedorImg,
  ImagenPreview,
  ImagenImagen,
  SpanImagen,
  ContenedorCampos,
  Opciones,
  Contenedor,
} from "./StyledComponents";
import { api } from "../../../api/api";
import { classNames } from "primereact/utils";
import * as Yup from "yup";

export const RegistrarUsuarios = () => {
  const [imagen, setImagen] = useState(null);
  const estructuraFormulario = {
    rut: "",
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    repetir: "",
    imagen: "",
    rol: "",
  };
  const [formulario, setFormulario] = useState(estructuraFormulario);

  const rolOptions = [
    { label: "Administrador", value: "administrador" },
    { label: "Cliente", value: "cliente" },
    { label: "Proveedor", value: "proveedor" },
  ];

  const limpiarFormulario = () => {
    formik.resetForm(setFormulario(estructuraFormulario), setImagen(null));
  };

  const handleFileChange = (e) => {
    const file = e.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Cuando se completa la lectura del archivo, el resultado estará en reader.result
        const base64String = reader.result;
        formik.setFieldValue("imagen", base64String);
      };

      // Lee el archivo como una URL de datos (base64)
      reader.readAsDataURL(file);
    }
  };

  const crearUsuario = async () => {
    try {
      const response = await api.post("usuario", {
        ...formik.values,
      });
      const { data } = response;
      limpiarFormulario();
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("se intento crear el usuario");
    }
  };

  const RegistrarSchema = Yup.object().shape({
    rut: Yup.string()
      .required("Rut requerido")
      .min(9, "Rut invalido")
      .max(9, "Rut invalido")
      .matches(/^[0-9]{7,8}[0-9kK]$/, "Rut invalido"),
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

  const formik = useFormik({
    initialValues: {
      ...formulario,
    },
    validationSchema: RegistrarSchema,

    // validate: (data) => {
    //   let errors = {};
    //   if (!data.rut) {
    //     errors.rut = "Rut requerido";
    //   } else {
    //     const rutSinFormato = data.rut.replace(/[.-]/g, "");
    //     if (!/^[0-9]{7,8}[0-9kK]$/.test(rutSinFormato)) {
    //       errors.rut = "Rut invalido";
    //     }
    //   }
    //   if (!data.nombre) {
    //     errors.nombre = "Nombre requerido";
    //   } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(data.nombre)) {
    //     errors.nombre = "Nombre invalido";
    //   }
    //   if (!data.apellido) {
    //     errors.apellido = "Apellido requerido";
    //   } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(data.apellido)) {
    //     errors.apellido = "Apellido invalido";
    //   }
    //   if (!data.correo) {
    //     errors.correo = "Correo requerido";
    //   } else if (!/\S+@\S+\.\S+/.test(data.correo)) {
    //     errors.correo = "Correo invalido";
    //   }
    //   if (!data.contrasena) {
    //     errors.contrasena = "Contraseña requerida";
    //   } else if (!/^[a-zA-Z0-9À-ÿ\s]{4,40}$/.test(data.contrasena)) {
    //     errors.contrasena = "Contraseña invalida";
    //   }
    //   if (!data.repetir) {
    //     errors.repetir = "Debe repetir la contraseña";
    //   } else if (!/^[a-zA-Z0-9À-ÿ\s]{4,40}$/.test(data.repetir)) {
    //     errors.repetir = "Repetir contraseña invalida";
    //   }
    //   if (data.contrasena !== data.repetir) {
    //     errors.repetir = "Las contraseñas no coinciden";
    //   }
    //   if (!data.imagen) {
    //     errors.imagen = "Imagen requerida";
    //   }
    //   if (!data.rol) {
    //     errors.rol = "Rol requerido";
    //   }
    //   return errors;
    // },

    onSubmit: (data) => {
      console.log(data);
      crearUsuario();
      limpiarFormulario();
    },
  });

  const isFormFieldInvalid = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  return (
    <Contenedor>
      <Formulario onSubmit={formik.handleSubmit}>
        <Inputs>
          <Campos>
            <label htmlFor="rol">Rol</label>
            <Dropdown
              style={{ width: "100%" }}
              id="rol"
              options={rolOptions}
              onChange={(e) => {
                formik.setFieldValue("rol", e.target.value);
              }}
              className={classNames({ "p-invalid": isFormFieldInvalid("rol") })}
              placeholder="Seleccionar Rol"
              name="rol"
              value={formik.values.rol}
            />
          </Campos>
          {getFormErrorMessage("rol")}
        </Inputs>
        <div style={{ display: "flex", gap: "1rem" }}>
          <ContenedorImg>
            <ImagenPreview>
              {formik.values.imagen == "" ? <SpanImagen className="pi pi-camera" /> : <ImagenImagen src={formik.values.imagen} />}
            </ImagenPreview>
            {imagen && (
              <div style={{ marginTop: "10px" }}>
                <img src={URL.createObjectURL(imagen)} alt="Vista previa de la foto de perfil" />
              </div>
            )}
            <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} auto chooseLabel="Seleccionar" onSelect={handleFileChange} />
            {getFormErrorMessage("imagen")}
          </ContenedorImg>
          <ContenedorCampos>
            <InputRow>
              <Campos>
                <label htmlFor="rut">Rut</label>
                <InputContainer
                  name="rut"
                  placeholder="Ingrese rut sin puntos ni guión.."
                  value={formik.values.rut}
                  handleChange={(e) => {
                    formik.setFieldValue("rut", e.target.value);
                  }}
                  className={classNames({ "p-invalid": isFormFieldInvalid("rut") })}
                />
                {getFormErrorMessage("rut")}
              </Campos>
              <Campos>
                <label htmlFor="nombre">Nombre</label>
                <InputContainer
                  name="nombre"
                  placeholder="Ingrese su nombre.."
                  value={formik.values.nombre}
                  handleChange={(e) => {
                    formik.setFieldValue("nombre", e.target.value);
                  }}
                  className={classNames({ "p-invalid": isFormFieldInvalid("nombre") })}
                />
                {getFormErrorMessage("nombre")}
              </Campos>
            </InputRow>
            <InputRow>
              <Campos>
                <label htmlFor="apellido">Apellido</label>
                <InputContainer
                  name="apellido"
                  placeholder="Ingrese su apellido.."
                  value={formik.values.apellido}
                  handleChange={(e) => {
                    formik.setFieldValue("apellido", e.target.value);
                  }}
                  className={classNames({ "p-invalid": isFormFieldInvalid("apellido") })}
                />
                {getFormErrorMessage("apellido")}
              </Campos>
              <Campos>
                <label htmlFor="correo">Correo</label>
                <InputContainer
                  name="correo"
                  type={"email"}
                  placeholder="El correo debe llevar @.."
                  value={formik.values.correo}
                  handleChange={(e) => {
                    formik.setFieldValue("correo", e.target.value);
                  }}
                  className={classNames({ "p-invalid": isFormFieldInvalid("correo") })}
                />
                {getFormErrorMessage("correo")}
              </Campos>
            </InputRow>
            <InputRow>
              <Campos>
                <label htmlFor="contrasena">Contraseña</label>
                <InputContainer
                  name="contrasena"
                  placeholder="Ingrese su contraseña.."
                  value={formik.values.contrasena}
                  type={"password"}
                  handleChange={(e) => {
                    formik.setFieldValue("contrasena", e.target.value);
                  }}
                  className={classNames({ "p-invalid": isFormFieldInvalid("contrasena") })}
                />
                {getFormErrorMessage("contrasena")}
              </Campos>
              <Campos>
                <label htmlFor="repetir">Repetir contraseña</label>
                <InputContainer
                  name="repetir"
                  placeholder="Repita su contraseña.."
                  value={formik.values.repetir}
                  type={"password"}
                  handleChange={(e) => {
                    formik.setFieldValue("repetir", e.target.value);
                  }}
                  className={classNames({ "p-invalid": isFormFieldInvalid("repetir") })}
                />
                {getFormErrorMessage("repetir")}
              </Campos>
            </InputRow>
            <Opciones>
              <Button label="Registrar" severity="success" rounded type="submit" />
              <Button label="Limpiar" severity="danger" rounded onClick={limpiarFormulario} />
            </Opciones>
          </ContenedorCampos>
        </div>
      </Formulario>
    </Contenedor>
  );
};
