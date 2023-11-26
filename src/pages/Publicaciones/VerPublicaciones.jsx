import { useEffect, useRef, useState } from "react";
import { api } from "../../api/api";
import { Contenedor, ContenedorMP, ContenedorTabla, Titulo, ContenedorHeader } from "../Publicaciones/components/StyledVerPublicacion";
import { DataTable } from "primereact/datatable";
import { Card } from "primereact/card";
import { CustomCircle } from "../Publicaciones/components/StyledVerPublicacion";
import { classNames } from "primereact/utils";
import { MultiSelect } from "primereact/multiselect";
import { Slider } from "primereact/slider";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

export const Publicaciones = () => {
  const [publicacion, setPublicacion] = useState([]);
  const [search, setSearch] = useState("");
  const toast = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const categoryOptions = publicacion.map((post) => ({ label: post.categoria, value: post.categoria }));
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchName, setSearchName] = useState("");

  const traerPublicacion = async () => {
    try {
      const response = await api.get(`publicacion`);
      const { data } = response;
      console.log(data);
      setPublicacion(data.data);
      console.log(data.data.publicacion);
    } catch (error) {
      console.log(error);
      console.log("Se intento traer publicación");
    }
  };
  const imagenBodyTemplate = (rowData) => {
    return Array.isArray(rowData.imagen)
      ? rowData.imagen.map((imagenUrl, index) => <img key={index} src={imagenUrl} alt={`imagen ${index + 1}`} width="80px" className="shadow-4" />)
      : null;
  };
  useEffect(() => {
    traerPublicacion();
  }, []);
  const handleSearchName = () => {
    setFilteredPosts(publicacion.filter((post) => post.titulo && search && post.titulo.toLowerCase().includes(search.toLowerCase())));
  };
  const FilterBar = ({ onFilter }) => {
    const [searchName, setSearchName] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [searchPrice, setSearchPrice] = useState("");

    const handleFilter = (event) => {
      event.preventDefault();
      onFilter({ searchName, searchCategory, searchPrice });
    };

    return (
      <form onSubmit={handleFilter}>
        <input type="text" placeholder="Nombre" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
        <input type="text" placeholder="Categoría" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} />
        <input type="number" placeholder="Precio" value={searchPrice} onChange={(e) => setSearchPrice(e.target.value)} />
        <button type="submit">Filtrar</button>
      </form>
    );
  };
  return (
    <Contenedor>
      <Titulo>Publicaciones</Titulo>
      <form>
        <InputText value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Buscar por nombre" />
        <MultiSelect
          value={selectedCategories}
          options={categoryOptions}
          onChange={(e) => setSelectedCategories(e.value)}
          placeholder="Selecciona categorías"
        />
        <InputNumber
          value={minPrice}
          onValueChange={(e) => setMinPrice(e.value)}
          mode="currency"
          currency="CLP"
          locale="es-CL"
          placeholder="Precio mínimo"
        />
        <InputNumber
          value={maxPrice}
          onValueChange={(e) => setMaxPrice(e.value)}
          mode="currency"
          currency="CLP"
          locale="es-CL"
          placeholder="Precio máximo"
        />
      </form>
      <ContenedorMP>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
          {publicacion
            .filter(
              (post) =>
                (!selectedCategories || selectedCategories.includes(post.categoria)) &&
                post.precio >= minPrice &&
                post.precio <= maxPrice &&
                post.nombre.toLowerCase().includes(searchName.toLowerCase())
            )
            .map((post, index) => (
              <Card key={index} title={post.nombre} style={{ width: "16%", marginBottom: "1em", flex: "0 0 auto", margin: "1rem" }}>
                <p style={{ fontWeight: "bold" }}>Categoría: {post.categoria}</p>
                <img src={post.imagen} alt={`Imagen ${index + 1}`} style={{ width: "100%", height: "auto" }} />
                <p style={{ fontFamily: "Arial", fontSize: "20px", fontWeight: "bold" }}>${post.precio.toLocaleString("de-DE")}</p>
              </Card>
            ))}
        </div>
      </ContenedorMP>
    </Contenedor>
  );
};
