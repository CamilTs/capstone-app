import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";
import useGraficos from "./hooks/useGraficos";

export const GraficosCliente = () => {
  const { infoGrafico, loading } = useGraficos(null, "productoPorAnio");
  const { infoGrafico: registroData, loading: registroLoading } = useGraficos(null, "registro");
  const { infoGrafico: registroAnioData, loading: registroAnioLoading } = useGraficos(null, "registroAnio");
  // const { infoGrafico: infoGrafico2, loading: loading2 } = useGraficos({ data: { nombre: "hola" } });

  useEffect(() => {}, []);
  return (
    <div className="grid">
      <div className="col-6">
        <div className="p-card">
          <Chart type="bar" data={infoGrafico.data} options={infoGrafico.options} />
        </div>
      </div>
      <div className="col-6">
        <button
          onClick={() => {
            console.log(registroAnioData);
          }}
        >
          hola
        </button>
        <div className="p-card">
          <Chart type="bar" data={registroData.data} options={registroData.options} />
        </div>
      </div>
    </div>
  );
};
