import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useSelector } from "react-redux";
import { TablaVender } from "./components/TablaVender";
import { TablaRegistro } from "./components/TablaRegistro";
import { Alertas } from "./components/Alertas";

export const VenderProducto = ({ alertas }) => {
  const { comercio } = useSelector((state) => state.auth);
  const [registros, setRegistros] = useState([]);

  const cargarRegistros = async () => {
    try {
      const { data } = await api.get("registro/ultimosRegistros");
      console.log(data);
      if (!data.success) {
        setRegistros([]);
      }
      setRegistros(data.data);
    } catch (error) {
      setRegistros([]);
    }
  };
  useEffect(() => {
    cargarRegistros();
  }, []);

  return (
    <>
      <div className="grid h-full m-2">
        <div className="col-12">
          <TablaVender comercio={comercio} cargarRegistros={cargarRegistros} />
        </div>
        <div className="col-6">
          <TablaRegistro registros={registros} />
        </div>
        <div className="col-6">
          <Alertas alertas={alertas} />
        </div>
      </div>
    </>
  );
};
