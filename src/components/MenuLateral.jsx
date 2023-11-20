import { useEffect, useState } from "react";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import { PerfilCard } from "./PerfilCard";
import { rutas } from "../rutas";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Sidebar } from "primereact/sidebar";

const Fondo = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem 0;
  background: #fff;
  border-radius: 5px;
  height: 100%;
  min-height: 100vh;
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
`;

export const MenuLateral = ({ cerrarCuenta }) => {
  const [itemsRuta, setItemsRuta] = useState([]);
  let itemsPrueba = [];
  const { rol } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const prueba = () => {
    itemsPrueba = rutas
      .filter((el) => el.rol == rol)
      .map((el) => {
        return {
          label: el.label,
          icon: el.icono,
          command: () => {
            navigate(el.ruta);
          },
        };
      });
    setItemsRuta(itemsPrueba);
  };

  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    prueba();
  }, []);

  return (
    <Fondo>
      <TituloMenu>Ai Zi</TituloMenu>
      {itemsRuta.length > 0 && (
        <OpcionesMenu>
          <Menu model={itemsRuta} className="" />
          <PerfilCard cerrarCuenta={cerrarCuenta} />
          <Sidebar visible={menuVisible} onHide={() => setMenuVisible(false)}></Sidebar>
        </OpcionesMenu>
      )}
    </Fondo>
  );
};
