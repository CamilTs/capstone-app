import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";
import useGraficos from "./hooks/useGraficos";

import { Contenedor, ContenedorDatos, ContenedorDerecha, ContenedorGraficos, Titulo } from "./components/StyledComponentGraficos";
import { masVendidoMensual } from "./hooks/useGraficos";
import { totalVentas } from "./hooks/useGraficos";
import { vendidosAnual } from "./hooks/useGraficos";
import { formatoCurrencyCLP, formatoNombreMes } from "../../components/Formatos";
import { CustomCard } from "../../components/CustomCard";

export const GraficosCliente = () => {
  const { infoGrafico, loading, title: TitleProductoPorAnio } = useGraficos(null, "productoPorAnio", "Productos más vendidos");
  const { infoGrafico: registroData, loading: registroLoading, title: registroTitulo } = useGraficos(null, "registro", "Total de ventas por mes");
  const { infoGrafico: registroAnioData, loading: registroAnioLoading, title } = useGraficos(null, "registroAnio", "Registros por Año");

  const [masVendido, setMasVendido] = useState([]);
  const [nombreMasVendido, setNombreMasVendido] = useState("");
  const [ventasAnuales, setVentasAnuales] = useState([]);
  const [mesMejorVenta, setMesMejorVenta] = useState([]);
  const [vendidosAnio, setVendidosAnio] = useState([]);
  const [masVendidoAnio, setMasVendidoAnio] = useState([]);

  const getMasVendido = async () => {
    const data = await masVendidoMensual();
    // console.log(data);
    setMasVendido(data[0].cantidadVendida);
    setNombreMasVendido(data[0].nombre);
  };

  const getTotalVentas = async () => {
    const data = await totalVentas();
    const sumaTotal = data.reduce((a, b) => a + b.total, 0);
    setVentasAnuales(sumaTotal);
    const ordenarData = data.sort((a, b) => b.total - a.total);
    const mesMejorVenta = ordenarData[0];
    setMesMejorVenta(mesMejorVenta);
    // console.log(sumaTotal);
    // console.log(mesMejorVenta);
  };

  const getVendidosAnual = async () => {
    const data = await vendidosAnual();
    const sumaTotal = data.reduce((a, b) => a + b.cantidadVendida, 0);
    setMasVendidoAnio(sumaTotal);
    const ordenarData = data.sort((a, b) => b.cantidadVendida - a.cantidadVendida);
    console.log(ordenarData);
    const mejorVendido = ordenarData[0];
    setVendidosAnio(mejorVendido);
  };

  useEffect(() => {
    getMasVendido();
    getTotalVentas();
    getVendidosAnual();
  }, []);

  return (
    <Contenedor>
      <Titulo className="tituloCard">Dashboard</Titulo>
      <div className="flex">
        <CustomCard
          titulo="El más vendido"
          icono="pi pi-box"
          colorContenedor="bg-yellow-100"
          colorIcono="text-yellow-500"
          primerDatos={nombreMasVendido}
          segundoDatos={masVendido}
          segundoTexto="unidades"
        />
        <CustomCard
          titulo="Ganancias actuales"
          icono="pi pi-money-bill"
          colorContenedor="bg-green-100"
          colorIcono="text-green-500"
          primerDatos={formatoCurrencyCLP(ventasAnuales) + " CLP"}
          segundoDatos={formatoCurrencyCLP(mesMejorVenta.total)}
          segundoTexto={formatoNombreMes(mesMejorVenta.mes)}
        />
        <CustomCard
          titulo="Cantidad de ventas anuales"
          icono="pi pi-shopping-cart"
          colorContenedor="bg-blue-100"
          colorIcono="text-blue-500"
          primerDatos={masVendidoAnio}
          primerTexto="Se vendieron"
          segundoDatos={vendidosAnio.cantidadVendida}
          segundoTexto={vendidosAnio.nombre}
        />
      </div>

      <ContenedorGraficos>
        <ContenedorDerecha>
          <ContenedorDatos className="primero">
            <Titulo>{TitleProductoPorAnio}</Titulo>
            <Chart type="bar" data={infoGrafico.data} options={{ legend: { display: true } }} />
          </ContenedorDatos>

          <ContenedorDatos className="segundo">
            <Titulo>{title}</Titulo>
            <Chart type="line" data={registroAnioData.data} />
          </ContenedorDatos>
        </ContenedorDerecha>

        <ContenedorDatos className="tercero">
          <Titulo className="text-3xl m-0">{registroTitulo}</Titulo>
          <Chart
            className=""
            type="polarArea"
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
        </ContenedorDatos>
      </ContenedorGraficos>
    </Contenedor>
  );
};
