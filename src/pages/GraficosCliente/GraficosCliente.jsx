import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";
import useGraficos from "./hooks/useGraficos";

export const GraficosCliente = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const { infoGrafico, loading } = useGraficos(null, "productoPorAnio");
  // const { infoGrafico: infoGrafico2, loading: loading2 } = useGraficos({ data: { nombre: "hola" } });

  useEffect(() => {}, []);
  return (
    <div className="grid">
      <div className="col-6">
        <div className="p-card">
          <button
            onClick={() => {
              console.log(infoGrafico);
            }}
          >
            hola
          </button>
          <Chart type="bar" data={infoGrafico.data} options={infoGrafico.options} />
        </div>
      </div>
      <div className="col-6"></div>
    </div>
  );
};
