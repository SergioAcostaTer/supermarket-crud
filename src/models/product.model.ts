export interface Product {
  id?: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  fechas: {
    caducidad: Date;
    fabricacion: Date;
  };
}

export const emptyProduct: Product = {
  name: '',
  price: 0,
  stock: 0,
  description: '',
  fechas: { caducidad: new Date(), fabricacion: new Date() },
};
