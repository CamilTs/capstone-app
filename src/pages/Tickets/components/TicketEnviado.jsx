import React, { useEffect, useRef, useState } from "react";
import { api } from "../../../api/api";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import { CustomConfirmDialog } from "../../../components/CustomConfirmDialog";
import { ticketSchema } from "../../../components/Validaciones";
import { Message } from "primereact/message";
import { EnviarButton, TicketCard, TicketEnviadoContainer, TicketForm } from "./StyledTickets";
import { InputContainerDropdown, InputContainerTextArea } from "../../../components/InputContainer";

export const TicketEnviado = ({ ticketSeleccionado }) => {
  const { id } = useSelector((state) => state.auth);
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
          </div>
          <form onSubmit={formik.handleSubmit}>
            <TicketForm>
              <InputContainerDropdown
                id="asunto"
                options={Motivos}
                name="asunto"
                placeholder="Seleccione un motivo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.asunto}
              />
              {getFormErrorMessage("asunto")}
              <InputContainerTextArea
                className="descripcion"
                name="descripcion"
                placeholder="Descripción del Ticket"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.descripcion}
                disabled={!formik.values.asunto}
              />
              {getFormErrorMessage("descripcion")}
              <EnviarButton icon="pi pi-send" raised type="submit" label="Enviar" disabled={!formik.dirty || !formik.isValid} />
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
