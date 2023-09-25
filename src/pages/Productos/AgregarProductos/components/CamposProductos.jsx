import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

export const CamposProductos = ({ producto, handleChange }) => {
  return (
    <div>
      <div className="p-field">
        <label htmlFor="codigoBarra">Código de barra</label>
        <InputText id="codigoBarra" name="codigoBarra" value={producto.codigoBarra} onChange={handleChange} />
      </div>

      <div className="p-field">
        <label htmlFor="producto">Producto</label>
        <InputText id="producto" name="producto" value={producto.producto} onChange={handleChange} />
      </div>

      <div className="p-field">
        <label htmlFor="cantidad">Cantidad</label>
        <InputNumber
          id="cantidad"
          name="cantidad"
          value={producto.cantidad}
          onChange={(e) => handleChange({ target: { name: "cantidad", value: e.value } })}
          placeholder="Cantidad"
        />
      </div>

      <div className="p-field">
        <label htmlFor="precio">Valor</label>
        <InputNumber
          id="precio"
          name="precio"
          value={producto.precio}
          onChange={(e) => handleChange({ target: { name: "precio", value: e.value } })}
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
