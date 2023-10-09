import { useEffect, useState } from "react";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import { PerfilCard } from "./PerfilCard";
import { rutas } from "../rutas";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

const Fondo = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const TituloMenu = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 5px;
  background: #538a95;
  font-size: 30px;
  margin-bottom: 20px;
  text-align: center;
  color: white;
`;

const OpcionesMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const MenuLateral = ({ style }) => {
  const [itemsRuta, setItemsRuta] = useState([]);
  const { user } = useAuth();
  let itemsPrueba = [];
  const navigate = useNavigate();

  const prueba = () => {
    itemsPrueba = rutas
      .filter((el) => el.rol == user.rol)
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

  useEffect(() => {
    prueba();
  }, []);

  return (
    <Fondo style={style}>
      <TituloMenu>Ai Zi</TituloMenu>
      <OpcionesMenu>
        <Menu model={itemsRuta} className="w-full md:w-25rem" />
        <PerfilCard />
      </OpcionesMenu>
    </Fondo>
  );
};

export default MenuLateral;
