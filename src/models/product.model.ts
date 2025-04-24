export interface Product {
  id?: string;
  name: string;
  price?: number;
  stock?: number;
  description?: string;
  fechas: {
    caducidad?: Date;
    fabricacion?: Date;
  };
}
