import { Product } from './product';

export interface Cart {
  id: number | null;
  products: Product[];
}
