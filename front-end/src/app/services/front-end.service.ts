import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class FrontEndService {
  constructor(private http: HttpClient) {}

  userLogin(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/login`, data);
  }

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}/search`);
  }

  getAllJobs(): Observable<any> {
    return this.http.get(`${baseUrl}/jobListings`)
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/user/${id}`);
  }

  findByName(name: any): Observable<any> {
    return this.http.get(`${baseUrl}/search?name=${name}`);
  }

  findByJob(title: any): Observable<any>{
    return this.http.get(`${baseUrl}/jobListings?title=${title}`);
  }

  createEmp(data: any): Observable<any> {
    console.log("create employee method is called");
    console.log(`${baseUrl}/signUp/emp`);
    console.log(`The data being sent to this url: ${data.name}`);
    return this.http.post(`${baseUrl}/signUp/emp`, data);
  }

  createEmpr(data: any): Observable<any> {
    console.log("create employer method is called");
    console.log(`${baseUrl}/signUp/empr`);
    console.log(`The data being sent to this url: ${data.name}`);
    return this.http.post(`${baseUrl}/signUp/empr`, data);
  }

  createJob(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/jobPost`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/edit/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
