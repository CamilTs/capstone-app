import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

export const CamposProductos = ({ formulario, handleChange }) => {
  return (
    <div>
      <div className="p-field">
        <label htmlFor="codigoBarra">Código de barra</label>
        <InputText
          id="codigoBarra"
          name="codigoBarra"
          value={formulario.codigoBarra}
          onChange={handleChange}
        />
      </div>

      <div className="p-field">
        <label htmlFor="producto">Producto</label>
        <InputText
          id="producto"
          name="producto"
          value={formulario.producto}
          onChange={handleChange}
        />
      </div>

      <div className="p-field">
        <label htmlFor="cantidad">Cantidad</label>
        <InputNumber
          id="cantidad"
          name="cantidad"
          value={formulario.cantidad}
          onChange={(e) =>
            handleChange({ target: { name: "cantidad", value: e.value } })
          }
        />
      </div>

      <div className="p-field">
        <label htmlFor="precio">Valor</label>
        <InputNumber
          id="precio"
          name="precio"
          value={formulario.precio}
          onChange={(e) =>
            handleChange({ target: { name: "precio", value: e.value } })
          }
          mode="currency"
          currency="CLP"
          locale="es-CL"
          placeholder="Precio (CLP)"
        />
      </div>
    </div>
  );
};

export default CamposProductos;
