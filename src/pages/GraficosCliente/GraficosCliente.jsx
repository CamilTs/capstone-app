import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";
import useGraficos from "./hooks/useGraficos";

import { Contenedor, ContenedorDatos, ContenedorGraficos, Titulo } from "./components/StyledComponentGraficos";

export const GraficosCliente = () => {
  const { infoGrafico, loading, title: TitleProductoPorAnio } = useGraficos(null, "productoPorAnio", "Productos mas vendidos");
  const { infoGrafico: registroData, loading: registroLoading, title: registroTitulo } = useGraficos(null, "registro", "Total de ventas por mes");
  const { infoGrafico: registroAnioData, loading: registroAnioLoading, title } = useGraficos(null, "registroAnio", "Registros por Año");

  useEffect(() => {}, []);
  return (
    // <ScrollPanel style={{ width: "100%", height: "100%" }}>
    <Contenedor>
      <ContenedorGraficos>
        <ContenedorDatos>
          <Titulo>{TitleProductoPorAnio}</Titulo>
          <Chart type="bar" data={infoGrafico.data} options={{ legend: { display: true } }} />
        </ContenedorDatos>
      </ContenedorGraficos>

      <ContenedorGraficos>
        <ContenedorDatos>
          <Titulo>{title}</Titulo>
          <Chart type="line" data={registroAnioData.data} />
        </ContenedorDatos>
      </ContenedorGraficos>

      <ContenedorGraficos>
        <ContenedorDatos>
          <Titulo className="text-3xl m-0">{registroTitulo}</Titulo>
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
        </ContenedorDatos>
      </ContenedorGraficos>
    </Contenedor>
  );
};
