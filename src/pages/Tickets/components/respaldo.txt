import React, { useEffect, useRef, useState } from "react";
import { api } from "../../../api/api";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { CustomConfirmDialog } from "../../../components/CustomConfirmDialog";
import { ticketSchema } from "../../../components/Validaciones";
import { Message } from "primereact/message";
import { EnviarButton, TicketCard, TicketEnviadoContainer, TicketForm } from "./StyledTickets";
import { InputContainerDropdown, InputContainerTextArea } from "../../../components/InputContainer";

export const ResponderTickets = ({ ticketSeleccionado, setTicketSeleccionado }) => {
  const { id } = useSelector((state) => state.auth);
  const [verConfirmar, setVerConfirmar] = useState(false);
  const [tickets, setTickets] = useState([]);

  const toast = useRef(null);

  const traerTickets = async () => {
    try {
      const response = await api.get(`tickets/true`);
      const { data } = response;
      console.log(data.data);
      setTickets(data.data);
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "info",
        summary: "Vacio",
        detail: "¡Sin tickets!",
        life: 2000,
      });
    } finally {
      console.log(tickets.ticketsID);
    }
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

  const responderTicket = async () => {
    try {
      console.log("ticketSeleccionado:", ticketSeleccionado);
      const response = await api.put(`tickets/${ticketSeleccionado}`, {
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
    } finally {
      setVerConfirmar(false);
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
    if (ticketSeleccionado) {
      formik.setFieldValue("ticketsID", ticketSeleccionado._id);
    }
  }, [ticketSeleccionado]);

  return (
    <>
      <TicketEnviadoContainer>
        <Toast ref={toast} />
        <TicketCard>
          <div className="flex flex-row justify-content-between align-items-center">
            <h1>Responder Tickets</h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <TicketForm>
              <InputContainerDropdown
                name="ticketsID"
                value={formik.values.ticketsID}
                options={tickets}
                onChange={(e) => {
                  formik.setFieldValue("ticketsID", e.value._id);
                  setTicketSeleccionado(e.value);
                }}
                onBlur={formik.handleBlur}
                placeholder="Seleccionar ticket"
                optionLabel="ticketsID"
                optionValue="_id"
                disabled={!!ticketSeleccionado}
              />
              <InputContainerTextArea
                name="respuesta"
                type="text"
                placeholder="Escriba la respuesta del ticket..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.respuesta}
              />
              {getFormErrorMessage("respuesta")}
              <div className="flex flex-column w-full gap-2">
                <div>
                  <FileUpload
                    mode="advanced"
                    multiple
                    accept="*"
                    maxFileSize={1000000}
                    chooseOptions={{
                      iconOnly: true,
                      icon: "pi pi-paperclip",
                      style: {
                        marginRight: ".5em",
                        backgroundColor: "#00bfa5",
                        color: "white",
                        border: "none",
                        borderRadius: "2rem",
                      },
                    }}
                    cancelOptions={{
                      iconOnly: true,
                      icon: "pi pi-times",
                      style: {
                        marginRight: ".5em",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "2rem",
                      },
                    }}
                    auto={false}
                    uploadOptions={{
                      style: { display: "none" },
                    }}
                    onSelect={handleFileChange}
                    value={formik.values.archivo}
                  />
                </div>
                <div className="flex justify-content-center">
                  <EnviarButton
                    type="button"
                    label="Enviar"
                    onClick={() => {
                      console.log(ticketSeleccionado);
                      responderTicket(ticketSeleccionado._id);
                    }}
                    disabled={!formik.dirty}
                  />
                </div>
              </div>
            </TicketForm>
          </form>
        </TicketCard>
      </TicketEnviadoContainer>

      <CustomConfirmDialog
        visible={verConfirmar}
        onHide={() => setVerConfirmar(false)}
        onConfirm={responderTicket}
        type="submit"
        message="¿Confirmar envío?"
        header="Confirmar"
      />
    </>
  );
};
