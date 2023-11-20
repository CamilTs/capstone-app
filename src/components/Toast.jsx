import React, { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";

export const ToastMessage = ({ setMensaje, setTipoMensaje, setMostrarToast, severity, mensaje }) => {
  const toast = useRef(null);

  useEffect(() => {
    if (toast.current) {
      let summary = "Error";

      if (severity === "success") {
        summary = "Éxito";
      } else if (severity === "info") {
        summary = "Información";
      } else if (severity === "warn") {
        summary = "Advertencia";
      }

      toast.current.show({
        severity,
        summary,
        detail: mensaje,
        life: 2000,
        onHide: () => {
          setMostrarToast(false);
        },
      });
      setMensaje(mensaje);
      setTipoMensaje(severity);
      setMostrarToast(true);
    }
  }, [severity, mensaje, setMensaje, setTipoMensaje, setMostrarToast]);

  return <Toast ref={toast} />;
};
