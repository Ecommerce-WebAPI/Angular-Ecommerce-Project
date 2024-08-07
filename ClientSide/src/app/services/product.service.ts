import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces/i-product';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/i-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  categoryApiUrl: string = `${environment.apiUrl}categories`;
  apiurl: string = `${environment.apiUrl}products`;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.apiurl);
  }

  getById(productId: number){
    return this.httpClient.get(`${this.apiurl}/${productId}`);
  }

  add(product: any) {
    return this.httpClient.post(this.apiurl,product);
  }

  edit(productId: number, product: any) {
    return this.httpClient.put(`${this.apiurl}/${productId}`, product);
  }

  delete(productId: number) { 
    return this.httpClient.delete(`${this.apiurl}/${productId}`);
  }

  getByCategory(categoryName: string): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${this.apiurl}?categoryName=${categoryName}`);
  }

}
