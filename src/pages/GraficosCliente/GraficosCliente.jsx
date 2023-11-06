import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";
import useGraficos from "./hooks/useGraficos";

import { ScrollPanel } from "primereact/scrollpanel";

export const GraficosCliente = () => {
  const { infoGrafico, loading } = useGraficos(null, "productoPorAnio");
  const { infoGrafico: registroData, loading: registroLoading } = useGraficos(null, "registro");
  const { infoGrafico: registroAnioData, loading: registroAnioLoading } = useGraficos(null, "registroAnio");

  useEffect(() => {}, []);
  return (
    <ScrollPanel style={{ width: "100%", height: "100%" }}>
      <div className="grid">
        <div className="col-5">
          <div className="p-card">
            <Chart type="bar" data={infoGrafico.data} options={infoGrafico.options} />
          </div>
        </div>

        <div className="col-5">
          <div className="p-card">
            <Chart type="line" data={registroAnioData.data} />
          </div>
        </div>
        <div className="col-5">
          <div className="p-card">
            <Chart
              className=""
              type="pie"
              data={registroData.data}
              options={{
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      font: {
                        size: 14,
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </ScrollPanel>
  );
};
