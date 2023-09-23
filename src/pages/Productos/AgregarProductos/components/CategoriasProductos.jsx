import { useState } from "react";
import { RadioButton } from "primereact/radiobutton";

export const CategoriasProductos = ({ onCategoriasChange }) => {
  const [categoriaSeleccionadas, setCategoriaSeleccionadas] = useState([]);

  const categorias = [
    { label: "Alimentos y bebidas", value: "Alimentos" },
    { label: "Electrónica", value: "Electronica" },
    { label: "Electrodomésticos", value: "Electrodomesticos" },
    { label: "Ropa y moda", value: "Ropa" },
    { label: "Artículos personales", value: "Personal" },
  ];

  const handleCategoriaChange = (e) => {
    setCategoriaSeleccionadas(e.value);
    onCategoriasChange(e.value);
  };

  return (
    <div className="display-flex alig-items-center">
      <h3>Seleccionar categoria</h3>
      {categorias.map((categoria) => (
        <div key={categoria.value}>
          <RadioButton
            inputId={categoria.value}
            name="categoria"
            value={categoria.value}
            onChange={handleCategoriaChange}
            checked={categoriaSeleccionadas === categoria.value}
          />
          <label htmlFor={categoria.value} className="ml-2">
            {categoria.label}
          </label>
        </div>
      ))}
    </div>
  );
};
