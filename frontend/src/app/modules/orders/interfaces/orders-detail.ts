import { Product } from '../../products/interfaces/products';

export interface OrderDetail {
  qty: number;
  subtotal: number;
  price: number;
  product?: Product;
  productId?: number;
}
