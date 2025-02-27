import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private apiUrl = 'https://localhost:7080/api/v1/clients';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getClientById(id: number): Observable<Client > {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  createClient(client: Client): Observable<Client > {
    return this.http.post<Client>(`${this.apiUrl}/create`, client);
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/update/${id}`, client);
  }

  deleteClient(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.apiUrl}/delete/${id}`);
  }
}
