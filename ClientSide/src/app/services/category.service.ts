import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/i-category';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //apiurl: string = "http://localhost:5000/api/category";
  apiurl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAll() : Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${this.apiurl}category`);
  }

  getById(categoryId: number){
    return this.httpClient.get(`${this.apiurl}category/${categoryId}`);
  }

  add(category: any) {
    return this.httpClient.post(`${this.apiurl}category`,category);
  }
   
  edit(categoryId: number, category: any) {
    return this.httpClient.put(`${this.apiurl}category/${categoryId}`, category);
  }

  delete(categoryId: number) { 
    return this.httpClient.delete(`${this.apiurl}category/${categoryId}`);
  }
}