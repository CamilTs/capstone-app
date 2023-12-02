import { useEffect, useRef, useState } from "react";
import { Messages } from "primereact/messages";
import { useMountEffect } from "primereact/hooks";
export const Alertas = ({ alertas }) => {
  // const [alertas, setAlertas] = useState([]);
  const msgs = useRef(null);

  const mostrarAlertas = () => {
    console.log(alertas);
    msgs.current.clear();
    alertas.forEach((alerta) => {
      const { data, mensaje } = alerta;
      const { cantidad, nombre } = data;
      if (cantidad <= 2) {
        msgs.current.show({
          sticky: true,
          severity: "error",
          summary: `Stock bajo de ${nombre}`,
          detail: `Quedan ${cantidad} unidades`,
        });
      } else {
        msgs.current.show({
          sticky: true,
          severity: "warn",
          summary: `Stock bajo de ${nombre}`,
          detail: `Quedan ${cantidad} unidades`,
          clousable: true,
        });
      }
    });
  };
  // const getAlertas = () => {
  //   const alertas = localStorage.getItem("alertas");
  //   if (alertas) {
  //     const alertasParseadas = JSON.parse(alertas);
  //     mostrarAlertas(alertasParseadas);
  //     setAlertas(alertasParseadas);
  //   } else {
  //     setAlertas([]);
  //   }
  // };
  useMountEffect(() => {
    if (msgs.current) {
      msgs.current.clear();
      // getAlertas();
    }
  });
  useEffect(() => {
    mostrarAlertas();
  }, [alertas]);
  return (
    <div>
      <Messages ref={msgs} />
    </div>
  );
};
