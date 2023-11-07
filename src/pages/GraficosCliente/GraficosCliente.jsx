import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";
import useGraficos from "./hooks/useGraficos";

import { ScrollPanel } from "primereact/scrollpanel";

export const GraficosCliente = () => {
  const { infoGrafico, loading, title: TitleProductoPorAnio } = useGraficos(null, "productoPorAnio", "Productos mas vendidos");
  const { infoGrafico: registroData, loading: registroLoading, title: registroTitulo } = useGraficos(null, "registro", "Registros por Mes");
  const { infoGrafico: registroAnioData, loading: registroAnioLoading, title } = useGraficos(null, "registroAnio", "Registros por Año");

  useEffect(() => {}, []);
  return (
    <ScrollPanel style={{ width: "100%", height: "100%" }}>
      <div className="grid gap-2 justity-content-center">
        <div className="col-4 col-offset-2">
          <div className="p-card">
            <h5 className="text-3xl m-0">{TitleProductoPorAnio}</h5>
            <Chart type="bar" data={infoGrafico.data} options={infoGrafico.options} />
          </div>
        </div>

        <div className="col-4 ">
          <div className="p-card">
            <h5 className="text-3xl m-0">{title}</h5>

            <Chart type="line" data={registroAnioData.data} />
          </div>
        </div>
        <div className="col-4 col-offset-2">
          <div className="p-card">
            <h5 className="text-3xl m-0">{registroTitulo}</h5>
            <Chart
              className=""
              type="polarArea"
              data={registroData.data}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
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
