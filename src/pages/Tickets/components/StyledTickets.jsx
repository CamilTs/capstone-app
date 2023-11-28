import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import { InputContainer } from "../../../components/InputContainer";
import { Card } from "primereact/card";

export const TicketEnviadoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
`;

export const TicketCard = styled(Card)`
  width: 100%;
  height: 100%;
`;

export const TicketForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TicketInput = styled(InputContainer)`
  &.asunto {
    width: 100%;
    height: 3rem !important;
    border-radius: 5rem !important;
    background-color: #f2f2f2 !important;
    border: none !important;

    &:hover {
      background-color: #e6e6e6 !important;
    }
  }
  &.descripcion {
    width: 100%;
    align-self: center;
    align-items: center;
    height: 10rem !important;
    border-radius: 1rem !important;
    background-color: #f2f2f2 !important;
    border: none !important;

    &:hover {
      background-color: #e6e6e6 !important;
    }
  }
`;

export const EnviarButton = styled(Button)`
  align-self: center;
  width: 10rem;
  height: 3rem !important;
  border-radius: 5rem !important;
  background-color: #00bfa5 !important;
  color: white !important;
  font-weight: bold !important;
  border: none !important;

  &:hover {
    background-color: #009e8c !important;
  }
`;

export const ColorEstado = styled.div`
  background-color: ${(props) => (props.estado ? "green" : "red")};
  color: ${(props) => (props.estado ? "white" : "white")};
  border-radius: 20px;
  padding: 5px 10px;
  display: inline-block;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

export const TablaRegistros = styled(DataTable)`
  .p-datatable-thead > tr > th {
    background-color: #f8f9fa !important;
    border: 1px solid #dee2e6 !important;
    color: #212529 !important;
    font-weight: 700 !important;
    text-align: center !important;
    vertical-align: middle !important;
    padding: 0.75rem !important;
    vertical-align: middle !important;
    border-bottom: 2px solid #dee2e6 !important;
  }
  .p-datatable-tbody > tr > td {
    border: 1px solid #dee2e6 !important;
    vertical-align: middle !important;
    text-align: center !important;
    padding: 0.75rem !important;
    vertical-align: middle !important;
    border-bottom: 2px solid #dee2e6 !important;
  }
`;
