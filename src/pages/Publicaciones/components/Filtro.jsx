import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

export const Filtro = ({ seleccionarFiltro, filtro, categorias, buscar }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  return (
    <Panel header="Filtro">
      <div className="grid">
        <div className="flex gap-1 justify-content-between col-10">
          <InputText style={{ width: "23%" }} placeholder="Buscar por nombre" onChange={(e) => seleccionarFiltro("nombre", e.target.value)} />
          <Dropdown
            style={{ width: "23%" }}
            options={categorias}
            value={categoriaSeleccionada}
            onChange={(e) => {
              setCategoriaSeleccionada(e.value);
              seleccionarFiltro("categoria", e.value);
            }}
            placeholder="Selecciona categorías"
          />
          <InputNumber
            style={{ width: "23%" }}
            onChange={(e) => seleccionarFiltro("min", e.value)}
            value={filtro.min}
            mode="currency"
            currency="CLP"
            locale="es-CL"
            placeholder="Precio mínimo"
          />
          <InputNumber
            style={{ width: "23%" }}
            onChange={(e) => seleccionarFiltro("max", e.value)}
            value={filtro.max}
            mode="currency"
            currency="CLP"
            locale="es-CL"
            placeholder="Precio máximo"
          />
        </div>
        <div className="col-2 flex justify-content-around">
          <Button className="btn btn-primary" onClick={buscar}>
            Buscar
          </Button>
          <Button className="btn btn-primary" onClick={() => console.log(filtro)}>
            Buscar
          </Button>
        </div>
      </div>{" "}
    </Panel>
  );
};
