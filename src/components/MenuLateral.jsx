import { useEffect, useState } from "react";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import { PerfilCard } from "./PerfilCard";
import { rutas } from "../rutas";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Fondo = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem 0;
  background: #fff;
  border-radius: 5px;
`;

const TituloMenu = styled.div`
  display: flex;
  border-radius: 5px;
  background: #538a95;
  font-size: 30px;
  width: 100%;
  color: #fff;
  justify-content: center;
`;

const OpcionesMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .seleccionado {
    transition: all 0.3s ease-in-out !important;
    border-left: 3px solid green;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
  }

  .p-menuitem:hover .p-menuitem-icon {
    color: red !important;
  }
  .seleccionado .p-menuitem-icon {
    color: green !important;
    transition: all 1.2s ease-in-out !important;
  }
`;

export const MenuLateral = ({ cerrarCuenta }) => {
  const [itemsRuta, setItemsRuta] = useState([]);
  let itemsPrueba = [];
  const { rol } = useSelector((state) => state.auth);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate();

  const prueba = () => {
    itemsPrueba = rutas
      .filter((el) => el.rol == rol)
      .map((el, index) => {
        return {
          key: index,
          label: el.label,
          icon: el.icono,
          command: () => {
            navigate(el.ruta);
            setSelectedItem(index);
          },
        };
      });
    setItemsRuta(itemsPrueba);
  };

  useEffect(() => {
    prueba();
  }, []);

  return (
    <Fondo>
      <TituloMenu>Ai Zi</TituloMenu>
      {itemsRuta.length > 0 && (
        <OpcionesMenu>
          {/* <Menu model={itemsRuta} /> */}
          <Menu model={itemsRuta.map((item) => ({ ...item, className: item.key === selectedItem ? "seleccionado" : "" }))} />
          <PerfilCard cerrarCuenta={cerrarCuenta} />
        </OpcionesMenu>
      )}
    </Fondo>
  );
};
