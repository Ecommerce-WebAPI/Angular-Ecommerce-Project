import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/i-category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiurl: string = "http://localhost:5000/api/category";

  constructor(private httpClient: HttpClient) { }

  getAll() : Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(this.apiurl);
  }

  getById(categoryId: number){
    return this.httpClient.get(`${this.apiurl}/${categoryId}`);
  }

  add(category: any) {
    return this.httpClient.post(this.apiurl,category);
  }
   
  edit(categoryId: number, category: any) {
    return this.httpClient.put(`${this.apiurl}/${categoryId}`, category);
  }

  delete(categoryId: number) { 
    return this.httpClient.delete(`${this.apiurl}/${categoryId}`);
  }
}