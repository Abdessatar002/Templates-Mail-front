import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../model/client';
import { HttpResponse } from '../model/http-response';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = environment.url
  public emails: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
  constructor(private http: HttpClient) { }

  public addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.url}/recipient`, client)
  }

  public updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.url}/recipient`, client)
  }
  public deleteClient(cleintId: number): Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(`${this.url}/recipient/${cleintId}`)
  }
  public getClients(searchValue: string, page: number, size: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/recipient?searchValue=${searchValue}&page=${page}&size=${size}`)
  }
}
