import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import styled from "styled-components";

const Inputs = styled.div`
  flex: 1;
  display: flex;
  flex-flow: ${({ direction }) =>
    direction ? `${direction} wrap` : "row wrap"};
  /* flex-flow: row wrap; */
  justify-content: center;
  align-items: ${({ direction }) => (direction == "column" ? `center` : null)};
  gap: 20px;
`;

export const ContenedorForm1 = ({
  rolOptions,
  handleChange,
  formData,
  handleFileChange,
  fotoPerfil,
}) => {
  return (
    <div>
      <Inputs direction="column" className="CONTENEDOR FORM 1">
        <div style={{ width: "60%" }}>
          <Dropdown
            style={{ width: "100%" }}
            id="rol"
            options={rolOptions}
            onChange={handleChange}
            placeholder="Seleccionar Rol"
            name="rol"
            value={formData.rol}
          />
        </div>
        <div
          style={{
            border: "1px solid #999999bf",
            width: "200px",
            height: "200px",
            backgroundColor: "#e8f1f3",
            display: "grid",
            placeContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "50px",
              color: "white",
            }}
            className="pi pi-camera"
          ></span>
        </div>
        <FileUpload
          id="fotoPerfil"
          mode="basic"
          accept="image/*"
          onSelect={handleFileChange}
        />
        {fotoPerfil && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={URL.createObjectURL(fotoPerfil)}
              alt="Vista previa de la foto de perfil"
              style={{ maxWidth: "100px" }}
            />
          </div>
        )}
      </Inputs>
    </div>
  );
};
