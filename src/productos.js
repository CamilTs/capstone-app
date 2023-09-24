export const productos = [
  // Aqui son los productos Proveedor
  {
    id: 1,
    codigoBarra: "MANZANA-manzana-1234",
    nombre: "Manzana",
    imagen: "https://andreuprados.com/wp-content/uploads/2017/01/apple_0.jpg.webp",
    categoria: "Alimento",
    valor: 300,
    proveedorId: 3,
  },
  {
    id: 2,
    codigoBarra: "REFRIGERADOR-refrigerador-1234",
    nombre: "Refrigerador",
    imagen: "https://www.lg.com/cl/images/refrigeradores/md07545957/gallery/MZ-11.jpg",
    categoria: "Electrodoméstico",
    valor: 75000,
    proveedorId: 4,
  },

  // Aqui son los productos Clientes
  {
    id: 4,
    codigoBarra: "MANZANA-manzana-1234",
    producto: "Manzana",
    categoria: "Alimento",
    cantidad: 2,
    precio: 100,
    proveedorId: 2,
  },
];
