import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/clients';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  fetchClients() {
    return this.http.get<Client[]>(this.apiUrl);
  }

  removeClient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  fetchClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  addClient(data: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, data);
  }

  editClient(id: number, data: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, data);
  }
}
