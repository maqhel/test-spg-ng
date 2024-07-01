import { Client } from '../../clients/interfaces/clients';
import { OrderDetail } from './orders-detail';

export interface Order {
  id?: string;
  date: string;
  total: number;
  detail: OrderDetail[];
  client?: Client;
  clientId: number;
}
