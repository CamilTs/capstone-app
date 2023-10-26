export const formatoCurrencyCLP = (value) => {
  const formato = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  });
  return formato.format(value);
};
