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
