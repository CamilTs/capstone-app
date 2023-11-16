import React, { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";

export const ToastMessage = ({ severity, mensaje }) => {
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
      });
    }
  }, [severity, mensaje]);

  return <Toast ref={toast} />;
};
