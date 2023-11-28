import { useEffect, useRef, useState } from "react";
import { api } from "../../api/api";
import { Contenedor, ContenedorMP } from "../Publicaciones/components/StyledVerPublicacion";
import { Card } from "primereact/card";
import { Filtro } from "./components/Filtro";
import { Publicacion } from "./components/Publicacion";

import { ProgressSpinner } from "primereact/progressspinner";
import { Panel } from "primereact/panel";

export const Publicaciones = () => {
  const [loading, setLoading] = useState(false);
  const [publicacion, setPublicacion] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState({
    nombre: null,
    categoria: null,
    min: 0,
    max: 0,
  });

  const seleccionarFiltro = (name, value) => {
    setFiltro({
      ...filtro,
      [name]: value,
    });
  };

  const traerPublicacion = async () => {
    setLoading(true);
    filtro.categoria = filtro.categoria === null || filtro.categoria == "" || filtro.categoria == "0" ? "0" : filtro.categoria;
    filtro.nombre = filtro.nombre === null || filtro.nombre == "" || filtro.nombre == "0" ? "0" : filtro.nombre;
    filtro.min = filtro.min === 0 ? 0 : filtro.min;
    filtro.max = filtro.max === 0 ? 0 : filtro.max;
    try {
      const response = await api.get(`publicacion/filtro/${filtro.nombre}/${filtro.categoria}/${filtro.min}/${filtro.max}`);
      console.log(response);
      const { data } = response;
      setPublicacion(data.data);
      console.log(data.data.publicacion);
    } catch (error) {
      console.log(error);
      console.log("Se intento traer publicación");
    } finally {
      setLoading(false);
    }
  };

  const traerCategorias = async () => {
    try {
      const response = await api.get(`publicacion/buscar/categorias`);
      const { data } = response;
      console.log(data);
      setCategorias(data.data);
      console.log(data.data.publicacion);
    } catch (error) {
      console.log(error);
      console.log("Se intento traer publicación");
    }
  };

  useEffect(() => {
    traerPublicacion();
    traerCategorias();
  }, []);
  return (
    <Contenedor>
      <Filtro seleccionarFiltro={seleccionarFiltro} filtro={filtro} categorias={categorias} buscar={traerPublicacion} />
      {loading ? (
        <>
          <ProgressSpinner />
        </>
      ) : (
        <>
          <Panel header="Publicaciones">
            <div className="grid lg:col-offset-1 xl:justify-content-start sm:justify-content-center gap-3 w-full">
              {publicacion.map((post, index) => (
                <Publicacion key={index} publicacion={post} />
              ))}
            </div>
          </Panel>
        </>
      )}
    </Contenedor>
  );
};
