import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";
import useGraficos from "./hooks/useGraficos";

export const GraficosCliente = () => {
  const { infoGrafico, loading } = useGraficos(null, "productoPorAnio");
  const { infoGrafico: registroMesData, loading: registroMesLoading } = useGraficos(null, "mes");
  const { infoGrafico: pruebaData, loading: pruebaLoading } = useGraficos(null, "prueba");
  // const { infoGrafico: infoGrafico2, loading: loading2 } = useGraficos({ data: { nombre: "hola" } });

  useEffect(() => {}, []);
  return (
    <div className="grid">
      <div className="col-6">
        <div className="p-card">
          <Chart type="bar" data={infoGrafico.data} options={infoGrafico.options} />
        </div>
        <div className="p-card">
          <Chart type="line" data={pruebaData.data} options={pruebaData.options} />
          <button onClick={() => console.log(pruebaData)} />
        </div>
      </div>
      <div className="col-6"></div>
    </div>
  );
};
