import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class FrontEndService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}/search`);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/user/${id}`);
  }

  findByTitle(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/search`);
  }

  createEmp(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/signUp/emp`, data);
  }

  createEmpr(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/signUp/empr`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/edit/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
