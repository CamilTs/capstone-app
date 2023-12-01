import React, { useEffect, useRef, useState } from "react";
import { InputContainer, InputContainerTextArea, InputContainerDropdown } from "../../../components/InputContainer";
import { EnviarButton, TicketCard, TicketEnviadoContainer, TicketForm } from "./StyledTickets";
import { ticketSchemaRespuesta } from "../../../components/Validaciones";
import { CustomConfirmDialog } from "../../../components/CustomConfirmDialog";
import { Toast } from "primereact/toast";
import { useFormik } from "formik";
import { FileUpload } from "primereact/fileupload";
import { api } from "../../../api/api";
import { Message } from "primereact/message";

export const ResponderTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [ticketSeleccionado, setTicketSeleccionado] = useState(null);
  const [verConfirmar, setVerConfirmar] = useState(false);
  const toast = useRef(null);
  const fileUploadRef = useRef(null);

  const traerTickets = async () => {
    try {
      const response = await api.get(`tickets/true`);
      const { data } = response;
      console.log(data);
      setTickets(data.data);
      console.log(tickets);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudieron traer los tickets",
        life: 2000,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      ticketsID: null,
      archivo: null,
      respuesta: "",
    },
    validationSchema: ticketSchemaRespuesta,

    onSubmit: (values) => {
      console.log(values);
    },
  });

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

  const enviarRespuesta = async () => {
    try {
      const response = await api.put(`tickets/${ticketSeleccionado._id}`, {
        respuesta: formik.values.respuesta,
        archivo: formik.values.archivo,
      });
      const { data } = response;
      console.log(data);
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Respuesta enviada",
        life: 2000,
      });
      fileUploadRef.current.clear();
      formik.resetForm();
      setTicketSeleccionado(null);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo enviar la respuesta",
        life: 2000,
      });
    } finally {
      setVerConfirmar(false);
    }
  };

  const confirmarEnvio = () => {
    if (ticketSeleccionado) {
      setVerConfirmar(true);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Seleccione un ticket",
        life: 2000,
      });
    }
  };

  const validacionValores = (name) => formik.touched[name] && formik.errors[name];

  const getFormErrorMessage = (name) => {
    return validacionValores(name) ? (
      <span>
        <Message className="sticky" severity="error" text={`${formik.errors[name]}`}></Message>
      </span>
    ) : null;
  };

  useEffect(() => {
    traerTickets();
  }, []);

  return (
    <>
      <TicketEnviadoContainer>
        <Toast ref={toast} />
        <TicketCard>
          <div className="flex flex-row justify-content-between align-items-center">
            <h1>Responder Tickets</h1>
          </div>
          <TicketForm>
            <InputContainerDropdown
              id="ticketsID"
              name="ticketsID"
              placeholder="Seleccione un ticket.."
              options={tickets}
              optionLabel="ticketsID"
              value={formik.values.ticketsID}
              onChange={(e) => {
                formik.handleChange(e);
                setTicketSeleccionado(e.value);
              }}
              onBlur={formik.handleBlur}
            />
            {getFormErrorMessage("ticketsID")}
            <InputContainer id="asunto" value={ticketSeleccionado?.asunto || "Esperando que seleccione un ticket..."} name="asunto" disabled={true} />
            <InputContainerTextArea
              id="descripcion"
              value={ticketSeleccionado?.descripcion || "Esperando que seleccione un ticket..."}
              name="descripcion"
              disabled={true}
            />
            <InputContainerTextArea
              id="respuesta"
              value={formik.values.respuesta}
              name="respuesta"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Respuesta"
              disabled={!ticketSeleccionado}
            />
            {getFormErrorMessage("respuesta")}
            <div className="flex w-full justify-content-around gap-2">
              <FileUpload
                ref={fileUploadRef}
                mode="basic"
                accept="*"
                maxFileSize={1000000}
                chooseOptions={{
                  iconOnly: true,
                  icon: "pi pi-paperclip",
                  style: {
                    backgroundColor: "rgb(180 10 180)",
                    color: "white",
                    border: "2px solid rgb(119 40 129)",
                    borderRadius: "2rem",
                  },
                }}
                auto={false}
                onSelect={handleFileChange}
                value={formik.values.archivo}
                disabled={!ticketSeleccionado}
              />
              <div className="flex w-8 justify-content-end">
                <EnviarButton
                  type="button"
                  label="Enviar"
                  onClick={confirmarEnvio}
                  disabled={!formik.isValid || !formik.dirty || !ticketSeleccionado}
                />
              </div>
            </div>
          </TicketForm>
        </TicketCard>
      </TicketEnviadoContainer>

      <CustomConfirmDialog
        visible={verConfirmar}
        onHide={() => setVerConfirmar()}
        onConfirm={enviarRespuesta}
        message="¿Enviar respuesta?"
        header="Confirmar"
      />
    </>
  );
};
