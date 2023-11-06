import { useEffect, useState } from "react";
import { api } from "../../../api/api";

const useGraficos = (formato = {}, tipo = "") => {
  const formatoDefault = {
    data: { datasets: [] },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  formato = { ...formatoDefault, ...formato };

  const [loading, setLoading] = useState(false);
  const [infoGrafico, setInfoGrafico] = useState(formato);

  const getGrafico = async () => {
    try {
      setLoading(true);
      const response = await api.get("/registro");
      const { data } = response;
      setInfoGrafico(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const registroMes = async () => {
    const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const valores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    try {
      setLoading(true);
      const response = await api.get("/registro");
      const { data } = response;
      for (let i = 0; i < data.data.length; i++) {
        const element = data.data[i];
        const mes = new Date(element.createdAt).getMonth();
        valores[mes] = element.total;
      }
      setInfoGrafico({ ...infoGrafico, data: { labels, datasets: [{ label: "Ventas", data: valores }] } });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const productoPorAnio = async () => {
    const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const valores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    try {
      setLoading(true);
      const response = await api.get("/registro/productosVendidosAnio");
      const { data } = response;
      for (let i = 0; i < data.data.length; i++) {
        const element = data.data[i];
        const mes = element.mes - 1;
        valores[mes] = element.cantidadVendida;
      }
      setInfoGrafico({ ...infoGrafico, data: { labels, datasets: [{ label: "Producto mas vendido en el año", data: valores }] } });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const registroPorAnio = async () => {
    const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const valores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    console.log(infoGrafico);
    try {
      setLoading(true);
      const response = await api.get("/registro/compararRegistroAnio");
      const { data } = response;
      let nuevoDataset = [];
      for (const anioData in data.data) {
        if (Object.hasOwnProperty.call(data.data, anioData)) {
          const element = data.data[anioData];
          const datos = [...valores];

          for (let i = 0; i < element.length; i++) {
            const e = element[i];
            const mes = e.mes - 1;
            datos[mes] = e.total;
          }
          nuevoDataset.push({ label: anioData, data: datos });
        }
        setInfoGrafico({ ...infoGrafico, data: { labels, datasets: nuevoDataset } });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const cargarInformacion = () => {
    console.log(tipo);
    switch (tipo) {
      case "registro":
        registroMes();
        break;
      case "registroAnio":
        registroPorAnio();
        break;
      case "mes":
        registroMes();
        break;
      case "productoPorAnio":
        productoPorAnio();
        break;

      default:
        console.log("Secord");
        getGrafico();
        break;
    }
  };

  useEffect(() => {
    cargarInformacion();
  }, []);

  //   useEffect(() => {}, [infoGrafico]);
  return { loading, infoGrafico };
};

export default useGraficos;
