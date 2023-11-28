import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";
import useGraficos from "./hooks/useGraficos";

import { Contenedor, ContenedorDatos, ContenedorDerecha, ContenedorGraficos, Titulo } from "./components/StyledComponentGraficos";
import { ScrollPanel } from "primereact/scrollpanel";
import { masVendidoMensual } from "./hooks/useGraficos";
import { totalVentas } from "./hooks/useGraficos";
import { vendidosAnual } from "./hooks/useGraficos";
import { formatoCurrencyCLP } from "../../components/Formatos";
import { CustomCard } from "../../components/CustomCard";

export const GraficosCliente = () => {
  const { infoGrafico, loading, title: TitleProductoPorAnio } = useGraficos(null, "productoPorAnio", "Productos mas vendidos");
  const { infoGrafico: registroData, loading: registroLoading, title: registroTitulo } = useGraficos(null, "registro", "Total de ventas por mes");
  const { infoGrafico: registroAnioData, loading: registroAnioLoading, title } = useGraficos(null, "registroAnio", "Registros por Año");

  const [masVendido, setMasVendido] = useState([]);
  const [nombreMasVendido, setNombreMasVendido] = useState("");
  const [ventasAnuales, setVentasAnuales] = useState([]);
  const [mesMejorVenta, setMesMejorVenta] = useState([]);
  const [vendidosAnio, setVendidosAnio] = useState([]);

  const getMasVendido = async () => {
    const data = await masVendidoMensual();
    setMasVendido(data[0].cantidadVendida);
    setNombreMasVendido(data[0].nombre);
  };

  const getTotalVentas = async () => {
    const data = await totalVentas();
    const sumaTotal = data.reduce((a, b) => a + b.total, 0);
    const mes = data.map((mes) => mes);
    console.log(sumaTotal);
    setVentasAnuales(sumaTotal);
    setMesMejorVenta(mes);
    console.log(mesMejorVenta);
  };

  const getVendidosAnual = async () => {
    const data = await vendidosAnual();
    setVendidosAnio(data);
    console.log(data);
  };

  useEffect(() => {
    getMasVendido();
    getTotalVentas();
    getVendidosAnual();
  }, []);

  return (
    <Contenedor>
      <Titulo className="tituloCard m-0 text-3xl">Dashboard</Titulo>
      <div className="flex">
        <CustomCard
          titulo="Producto mas vendido"
          icono="pi pi-box"
          colorContenedor="bg-yellow-100"
          colorIcono="text-yellow-500"
          primerDatos={nombreMasVendido}
          segundoDatos={masVendido}
          scrollable={false}
          texto="unidades"
        />
        <CustomCard
          titulo="Ganancias actuales"
          icono="pi pi-money-bill"
          colorContenedor="bg-green-100"
          colorIcono="text-green-500"
          primerDatos={formatoCurrencyCLP(ventasAnuales)}
          segundoDatos={ventasAnuales}
          scrollable={false}
          texto="CLP"
        />
        <CustomCard
          titulo="Ventas de este año"
          icono="pi pi-shopping-cart"
          colorContenedor="bg-blue-100"
          colorIcono="text-blue-500"
          primerDatos={vendidosAnio}
          segundoDatos={vendidosAnio}
          scrollable={true}
          texto="unidades"
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
