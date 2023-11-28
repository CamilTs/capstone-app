import { Card } from "primereact/card";
import { formatoCurrencyCLP } from "../../../components/Formatos";

export const Publicacion = ({ publicacion, key }) => {
  const { nombre, categoria, precio, imagen, proveedor } = publicacion;
  console.log(publicacion);

  const header = () => {
    return <img alt="Card" style={{ height: "200px", objectFit: "cover", objectPosition: "center" }} src={imagen} />;
  };
  const footer = () => {
    return (
      <span>
        <p className="m-0 p-0">{formatoCurrencyCLP(precio)}</p>
      </span>
    );
  };
  return (
    <Card className="col-2 border-1 border-black-alpha-10" key={key} title={nombre} header={header} footer={footer}>
      <div>
        <i className="pi pi-tag p-mr-2"></i>
        <span className="m-0 p-0">{categoria}</span>
      </div>
      <div className="mt-2">
        <i className="pi pi-user p-mr-2"></i>
        <span className="m-0 p-0">{proveedor.nombre}</span>
        <span>
          {proveedor.nombre} {proveedor.apellido}
        </span>
      </div>
    </Card>
  );
};
