import React, { useEffect, useRef, useState } from "react";
import { api } from "../../../api/api";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { CustomConfirmDialog } from "../../../components/CustomConfirmDialog";
import { ticketSchema } from "../../../components/Validaciones";
import { Message } from "primereact/message";
import { Dropdown } from "primereact/dropdown";
import { EnviarButton, TicketCard, TicketEnviadoContainer, TicketForm, TicketInput } from "./StyledTickets";

export const TicketEnviado = ({ estado, ticketSeleccionado, setTicketSeleccionado }) => {
  const { id, rol } = useSelector((state) => state.auth);
  const [verConfirmar, setVerConfirmar] = useState(false);
  const toast = useRef(null);

  const Motivos = [
    { label: "Actualización Producto", value: "Actualización de producto/s" },
    { label: "Problema con el servicio", value: "Problema con el servicio" },
    { label: "Problema con la cuenta", value: "Problema con la cuenta" },
    { label: "Solicitud de registros", value: "Solicitud de registros" },
    { label: "Otro", value: "Otro" },
  ];

  const generateUniqueTicketID = () => {
    const timestamp = Date.now();
    const randomCharacters = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
    let randomID = "";

    for (let i = 0; i < 10; i++) {
      randomID += randomCharacters[Math.floor(Math.random() * randomCharacters.length)];
    }

    return `${timestamp}-${randomID}`;
  };

  const formik = useFormik({
    initialValues: {
      ticketsID: "",
      usuarioID: id,
      asunto: "",
      descripcion: "",
      estado: true,
      archivo: null,
      respuesta: "",
    },
    validationSchema: ticketSchema,

    onSubmit: (values) => {
      setVerConfirmar(true);
    },
  });

  const validacionValores = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return validacionValores(name) ? (
      <span>
        <Message className="sticky" severity="error" text={`${formik.errors[name]}`}></Message>
      </span>
    ) : null;
  };
  const enviarTicket = async () => {
    try {
      const uniqueTicketID = generateUniqueTicketID();
      const response = await api.post("tickets", { ...formik.values, ticketsID: uniqueTicketID });
      const { data } = response;
      console.log("Ticket creado", data);
      toast.current.show({
        severity: "success",
        summary: "Ticket creado",
        detail: "Se ha creado el ticket correctamente",
        life: 2000,
      });
      formik.resetForm();
    } catch (error) {
      console.log("Error al crear el ticket", error);
    } finally {
      setVerConfirmar(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        formik.setFieldValue("archivo", base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  const responderTicket = async (ticketsID) => {
    try {
      const response = await api.put(`tickets/${ticketsID}`, {
        respuesta: formik.values.respuesta,
        archivo: formik.values.archivo,
      });
      const { data } = response;
      console.log("Respuesta enviada", data);
      toast.current.show({
        severity: "success",
        summary: "Respuesta enviada",
        detail: "Se ha enviado la respuesta correctamente",
        life: 2000,
      });
      formik.resetForm();
      setTicketSeleccionado(null);
    } catch (error) {
      console.log("Error al enviar la respuesta", error);
    }
  };

  useEffect(() => {
    if (ticketSeleccionado) {
      formik.setValues({
        ...formik.values,
        asunto: ticketSeleccionado.asunto,
        descripcion: ticketSeleccionado.descripcion,
      });
    }
  }, [ticketSeleccionado]);

  return (
    <>
      <TicketEnviadoContainer>
        <Toast ref={toast} />
        <TicketCard>
          <div className="flex flex-row justify-content-between align-items-center">
            <h1>Crear ticket</h1>
            <FileUpload
              mode="basic"
              accept="*"
              maxFileSize={1000000}
              auto
              chooseLabel="Seleccionar"
              onSelect={handleFileChange}
              onBlur={formik.handleBlur}
              value={formik.values.archivo}
              disabled={estado === "crear"}
            />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <TicketForm>
              <Dropdown
                style={{ width: "100%", height: "3rem", borderRadius: "5rem", backgroundColor: "#f2f2f2", border: "none" }}
                id="asunto"
                options={Motivos}
                name="asunto"
                placeholder="Seleccione un motivo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.asunto}
                disabled={estado === "responder"}
              />
              {getFormErrorMessage("asunto")}
              <TicketInput
                className="descripcion"
                name="descripcion"
                type="text"
                placeholder="Descripción del Ticket"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.descripcion}
                disabled={estado === "responder"}
              />
              {getFormErrorMessage("descripcion")}
              <EnviarButton label="Enviar" disabled={!formik.dirty || !formik.isValid || estado === "responder"} />

              {rol === "admin" && ticketSeleccionado && (
                <>
                  <TicketInput
                    className="respuesta"
                    name="respuesta"
                    type="text"
                    placeholder="Respuesta al Ticket"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.respuesta}
                  />
                  {getFormErrorMessage("respuesta")}
                  <EnviarButton
                    type="button"
                    label="Responder"
                    onClick={() => {
                      console.log(ticketSeleccionado);
                      responderTicket(ticketSeleccionado._id);
                    }}
                  />
                </>
              )}
            </TicketForm>
          </form>
        </TicketCard>
      </TicketEnviadoContainer>

      <CustomConfirmDialog
        visible={verConfirmar}
        onHide={() => setVerConfirmar(false)}
        onConfirm={enviarTicket}
        type="submit"
        message="¿Seguro de enviar el ticket?"
        header="Confirmar"
      />
    </>
  );
};
