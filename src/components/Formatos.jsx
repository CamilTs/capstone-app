export const formatoCurrencyCLP = (value) => {
  const formato = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  });
  return formato.format(value);
};

export const formatoHora = (dateString) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes}`;
};

export const formatoFecha = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return date.toLocaleDateString("es-CL", options);
};

export const formatoRut = (rut) => {
  const rutFormateado = rut.replace(/^(\d{2,3})(\d{3})(\d{3})(\w{1})$/, "$1.$2.$3-$4");
  return rutFormateado;
};

export const formatoTelefono = (telefono) => {
  const telefonoFormateado = String(telefono).replace(/^(\d{1})(\d{4})(\d{4})$/, "$1 $2 $3");
  return telefonoFormateado;
};
