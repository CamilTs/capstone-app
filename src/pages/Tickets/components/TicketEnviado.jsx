import { Card } from "primereact/card";
import React, { useEffect, useRef, useState } from "react";
import { InputContainer } from "../../../components/InputContainer";
import { Button } from "primereact/button";
import styled from "styled-components";
import { api } from "../../../api/api";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { CustomConfirmDialog } from "../../../components/CustomConfirmDialog";
import { ticketSchema } from "../../../components/Validaciones";
import { Message } from "primereact/message";

const TicketEnviadoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TicketCard = styled(Card)`
  width: 100%;
  height: 100%;
`;

const TicketForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TicketInput = styled(InputContainer)`
  &.asunto {
    width: 100%;
    height: 3rem !important;
    border-radius: 5rem !important;
    background-color: #f2f2f2 !important;
    border: none !important;

    &:hover {
      background-color: #e6e6e6 !important;
    }
  }
  &.descripcion {
    width: 100%;
    align-self: center;
    align-items: center;
    height: 10rem !important;
    border-radius: 1rem !important;
    background-color: #f2f2f2 !important;
    border: none !important;

    &:hover {
      background-color: #e6e6e6 !important;
    }
  }
`;

const EnviarButton = styled(Button)`
  align-self: center;
  width: 10rem;
  height: 3rem !important;
  border-radius: 5rem !important;
  background-color: #00bfa5 !important;
  color: white !important;
  font-weight: bold !important;
  border: none !important;

  &:hover {
    background-color: #009e8c !important;
  }
`;

export const TicketEnviado = ({ estado, ticketSeleccionado, setTicketSeleccionado, responderTicketUsuario }) => {
  const { id, rol } = useSelector((state) => state.auth);
  const [verConfirmar, setVerConfirmar] = useState(false);
  const toast = useRef(null);

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
        // Cuando se completa la lectura del archivo, el resultado estará en reader.result
        const base64String = reader.result;
        formik.setFieldValue("archivo", base64String);
      };

      // Lee el archivo como una URL de datos (base64)
      reader.readAsDataURL(file);
    }
  };

  const responderTicket = async () => {
    try {
      const uniqueTicketID = generateUniqueTicketID();
      const response = await api.post("tickets", {
        ...formik.values,
        ticketsID: uniqueTicketID,
        usuarioID: ticketSeleccionado.usuarioID,
        asunto: `Respuesta al ticket ${formik.values.ticketsID}`,
        descripcion: formik.values.respuesta,
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
          <div className="flex flex-row gap-2 align-items-center">
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
            />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <TicketForm>
              <TicketInput
                className="asunto"
                name="asunto"
                type="text"
                placeholder="Motivo del Ticket"
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
                  <EnviarButton type="button" label="Responder" onClick={() => responderTicket(formik.values.usuarioID)} />
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
