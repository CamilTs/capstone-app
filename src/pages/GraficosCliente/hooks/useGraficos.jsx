import { useEffect, useState } from "react";
import { api } from "../../../api/api";

const useGraficos = (formato = {}, tipo = "", title = "") => {
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
        const mes = element.mes - 1;
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
      const nuevoDataset = [];
      for (let i = 0; i < data.data.length; i++) {
        const nuevosValores = [...valores];
        const element = data.data[i];
        const nombre = element.nombre;
        const mes = element.mes - 1;
        valores[mes] = element.cantidadVendida;
        labels[mes] = `${nombre} - ${labels[mes]}`;
      }
      nuevoDataset.push({
        label: "Producto mas vendido",
        data: valores,
        backgroundColor: [
          "rgba(169, 74, 59, 0.4)",
          "rgba(188, 113, 119, 0.4)",
          "rgba(158, 134, 158, 0.4)",
          "rgba(134, 119, 158, 0.4)",
          "rgba(80, 76, 158, 0.4)",
          "rgba(134, 46, 119, 0.4)",
          "rgba(134, 46, 119, 0.4)",
          "rgba(134, 188, 119, 0.4)",
          "rgba(134, 188, 178, 0.4)",
          "rgba(134, 188, 208, 0.4)",
          "rgba(134, 111, 208, 0.4)",
          "rgba(134, 141, 208, 0.4)",
        ],
        borderColor: [
          "rgb(169, 74, 59)",
          "rgb(188, 113, 119)",
          "rgb(158, 134, 158)",
          "rgb(134, 119, 158)",
          "rgb(80, 76, 158)",
          "rgb(134, 46, 119)",
          "rgb(134, 46, 119)",
          "rgb(134, 188, 119)",
          "rgb(134, 188, 178)",
          "rgb(134, 188, 208)",
          "rgb(134, 111, 208)",
          "rgb(134, 141, 208)",
        ],
        borderWidth: 2,
        barPercentage: 0.6,
      });
      setInfoGrafico({
        ...infoGrafico,
        data: {
          labels,
          datasets: nuevoDataset,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // const productoPorAnio = async () => {
  //   const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  //   const valores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  //   try {
  //     setLoading(true);
  //     const response = await api.get("/registro/productosVendidosAnio");
  //     const { data } = response;
  //     let nuevoDataset = [];
  //     for (let i = 0; i < data.data.length; i++) {
  //       const nuevosValores = [...valores];
  //       const element = data.data[i];
  //       const nombre = element.nombre;
  //       console.log(element);
  //       const mes = element.mes - 1;
  //       valores[mes] = element.cantidadVendida;
  //     }
  //     nuevoDataset = [{ label: "Prueba", data: valores }];
  //     setInfoGrafico({ ...infoGrafico, data: { labels, datasets: nuevoDataset } });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const registroPorAnio = async () => {
    const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const valores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
    }
  };

  const cargarInformacion = () => {
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
        getGrafico();
        break;
    }
  };

  useEffect(() => {
    cargarInformacion();
  }, []);

  //   useEffect(() => {}, [infoGrafico]);
  return { loading, infoGrafico, title };
};

export default useGraficos;
