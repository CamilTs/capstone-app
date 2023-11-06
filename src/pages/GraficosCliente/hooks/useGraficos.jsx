import { useEffect, useState } from "react";
import { api } from "../../../api/api";

const useGraficos = (formato = {}, tipo = "") => {
  const formatoDefault = {
    data: {},
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
  const data = {};

  const getGrafico = async () => {
    try {
      setLoading(true);
      const response = await api.get("/registro");
      const { data } = response;
      console.log(data);
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

  const pruebaProductosPorAnio = async () => {
    const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const valoresMasVendidos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const valoresMenosVendidos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let cantidadMasVendida = 0;
    let productoMasVendido = "";
    let cantidadMenosVendida = Infinity;
    let productoMenosVendido = "";
    let mesMas = "";
    let mesMenos = "";

    try {
      setLoading(true);
      const response = await api.get("/registro/productosVendidosAnioPrueba");
      const { data } = response;
      console.log("====================================");
      console.log("SOY EL DE PRUEBA", data);
      for (let i = 0; i < data.data.length; i++) {
        const element = data.data[i];
        console.log(element);
        const mes = element.mes - 1;
        const nombre = element.nombre;
        console.log(nombre);

        if (element.cantidadVendida > cantidadMasVendida) {
          cantidadMasVendida = element.cantidadVendida;
          productoMasVendido = nombre;
          mesMas = mes;
        }

        if (element.cantidadVendida < cantidadMenosVendida) {
          cantidadMenosVendida = element.cantidadVendida;
          productoMenosVendido = nombre;
          mesMenos = mes;
        }

        valoresMasVendidos[mes] = element.cantidadVendida;
        valoresMenosVendidos[mes] = element.cantidadVendida;
        console.log("====================================");
        console.log(valoresMasVendidos);
        console.log(valoresMenosVendidos);
        console.log("====================================");
      }

      console.log("====================================");
      console.log(`SOY EL MAS VENDIDO DE ¡¡${mesMas}!!`, productoMasVendido, cantidadMasVendida);
      console.log(`SOY EL MAS VENDIDO DE ¡¡${mesMenos}!!`, productoMenosVendido, cantidadMenosVendida);
      console.log("====================================");

      setInfoGrafico({
        ...infoGrafico,
        data: {
          labels,
          datasets: [
            { label: `Producto noviembre: ${productoMasVendido}`, data: valoresMasVendidos },
            { label: `Producto octubre: ${productoMenosVendido}`, data: valoresMenosVendidos },
          ],
        },
      });
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
        getGrafico();
        break;
      case "mes":
        registroMes();
        break;
      case "productoPorAnio":
        productoPorAnio();
        break;
      case "prueba":
        pruebaProductosPorAnio();
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
