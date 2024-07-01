import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/orders';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = 'http://localhost:8080/api/pedidos';

  constructor(private http: HttpClient) {}

  fetchOrders() {
    return this.http.get<Order[]>(this.apiUrl);
  }

  removeOrder(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  fetchOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  addOrder(data: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, data);
  }

  editOrder(id: string, data: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}`, data);
  }
}
