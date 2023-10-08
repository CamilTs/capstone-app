import React, { useState, useRef } from "react";
import { useProductos } from "../../../context/ProductosContext";
import { useAuth } from "../../../context/AuthContext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import styled from "styled-components";
import { Image } from "primereact/image";

const ContenedorAncho = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 10px;
  flex-direction: column;
`;

const ContenedorPrimario = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
`;

const ContenedorImg = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const ImagenPreview = styled.div`
  border: 1px solid #999999bf;
  width: 502px;
  height: 502px;
  display: grid;
  justify-items: center;
  align-items: center;

  @media (max-width: 1920px) {
    width: 502px;
    height: 502px;
  }
  @media (max-width: 1600px) {
    width: 402px;
    height: 402px;
  }
  @media (max-width: 1360px) {
    width: 302px;
    height: 302px;
  }
  @media (max-width: 1024px) {
    width: 202px;
    height: 202px;
  }
`;

const ImagenImagen = styled.img`
  object-fit: cover;
  width: 500px;
  height: 500px;

  @media (max-width: 1920px) {
    width: 500px;
    height: 500px;
  }
  @media (max-width: 1600px) {
    width: 400px;
    height: 400px;
  }
  @media (max-width: 1360px) {
    width: 300px;
    height: 300px;
  }
  @media (max-width: 1024px) {
    width: 200px;
    height: 200px;
  }
`;

const SpanImagen = styled.span`
  font-size: 50px;
  color: black;
`;

const LabelImagen = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
`;

const ContenedorCampos = styled.div`
  width: 100%;
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  gap: 1rem 1rem;
`;

const CamposPrimarios = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CamposSecundarios = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContenedorNumber = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
  gap: 0 1rem;
`;

const Opciones = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Titulo = styled.h2`
  font-size: 20px;
  display: flex;
  justify-content: center;
`;

const categorias = [
  { label: "Alimentos y bebidas", value: "Alimentos y bebidas" },
  { label: "Electrodoméstico", value: "Electrodoméstico" },
  { label: "Electrónica", value: "Electrónica" },
];

export const AgregarProductos = () => {
  const { agregarProducto } = useProductos();
  const { user } = useAuth();
  const [imagen, setimagen] = useState(null);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const toast = useRef(null);

  const estructuraFormulario = {
    id: Date.now(),
    fecha: new Date(),
    codigoBarra: "",
    producto: "",
    imagen: "",
    categoria: null,
    cantidad: Number(0),
    clienteId: user.id,
    precio: Number(0),
  };
  const [producto, setProducto] = useState(estructuraFormulario);

  const handleFileChange = (e) => {
    const file = e.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Cuando se completa la lectura del archivo, el resultado estará en reader.result
        const base64String = reader.result;
        setProducto({ ...producto, imagen: base64String });
      };
      // Lee el archivo como una URL de datos (base64)
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleAgregarProducto = () => {
    agregarProducto(producto, user.id);
    toast.current.show({ severity: "success", summary: "Listo", detail: "Producto Agregado", life: 2000 });

    setConfirmDialogVisible(false);
    setProducto(estructuraFormulario);
    console.log(producto);
  };

  const handleLimpiarFormulario = () => {
    setProducto(estructuraFormulario);
    setimagen(null);
  };

  const agregarProductoDialog = (
    <React.Fragment>
      <Button label="Agregar" icon="pi pi-check" severity="success" onClick={handleAgregarProducto} />
      <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={() => setConfirmDialogVisible(false)} />
    </React.Fragment>
  );

  return (
    <ContenedorAncho>
      <Titulo>
        <h2>Agregar Productos</h2>
      </Titulo>
      <form onSubmit={handleSubmit}>
        <Toast ref={toast} />
        <div className="p-fluid">
          <ContenedorPrimario>
            <ContenedorImg>
              <ImagenPreview>
                {producto.imagen == "" ? <SpanImagen className="pi pi-camera" /> : <ImagenImagen src={producto.imagen} />}
              </ImagenPreview>
              {imagen && (
                <div style={{ marginTop: "10px" }}>
                  <img src={URL.createObjectURL(imagen)} alt="Vista previa de la foto de perfil" style={{ maxWidth: "100px" }} />
                </div>
              )}
              <LabelImagen>
                <label htmlFor="imagen">Imagen</label>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} auto chooseLabel="Subir" onSelect={handleFileChange} />
              </LabelImagen>
            </ContenedorImg>
            <ContenedorCampos>
              <CamposPrimarios>
                <label htmlFor="producto">Nombre</label>
                <InputText id="producto" value={producto.producto} onChange={(e) => setProducto({ ...producto, producto: e.target.value })} />
              </CamposPrimarios>
              <CamposPrimarios>
                <label htmlFor="codigoBarra">Codigo de barra</label>
                <InputText
                  id="codigoBarra"
                  value={producto.codigoBarra}
                  onChange={(e) => setProducto({ ...producto, codigoBarra: e.target.value })}
                />
              </CamposPrimarios>
              <CamposPrimarios>
                <label htmlFor="categoria">Categoría</label>
                <Dropdown
                  id="categoria"
                  options={categorias}
                  value={producto.categoria}
                  onChange={(e) => setProducto({ ...producto, categoria: e.value })}
                  placeholder="Seleccione una categoría"
                />
              </CamposPrimarios>
              <ContenedorNumber>
                <CamposSecundarios>
                  <label htmlFor="cantidad" className="font-bold block mb-2">
                    Cantidad
                  </label>
                  <InputNumber
                    inputId="minmax-buttons"
                    value={producto.cantidad}
                    onValueChange={(e) => setProducto({ ...producto, cantidad: e.target.value })}
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                  />
                </CamposSecundarios>
                <CamposSecundarios>
                  <label htmlFor="precio" className="font-bold block mb-2">
                    Precio
                  </label>
                  <InputNumber id="precio" value={producto.precio} onValueChange={(e) => setProducto({ ...producto, precio: e.target.value })} />
                </CamposSecundarios>
              </ContenedorNumber>
            </ContenedorCampos>
          </ContenedorPrimario>
        </div>
        <Opciones>
          <Button
            label="Agregar"
            icon="pi pi-plus"
            className="p-button-success"
            rounded
            onClick={() => {
              setConfirmDialogVisible(true);
            }}
          />
          <Button label="Limpiar" icon="pi pi-trash" className="p-button-danger" rounded onClick={handleLimpiarFormulario} />
        </Opciones>
        <ConfirmDialog
          visible={confirmDialogVisible}
          onHide={() => setConfirmDialogVisible(false)}
          message="¿Seguro que deseas agregar el producto?"
          header="Confirmar Agregado"
          icon="pi pi-question-circle"
          acceptClassName="p-button-success"
          footer={agregarProductoDialog}
        />
      </form>
    </ContenedorAncho>
  );
};

export default AgregarProductos;
