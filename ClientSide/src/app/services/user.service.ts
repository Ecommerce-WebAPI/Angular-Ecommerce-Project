import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserDetails } from '../interfaces/i-user-details';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiurl: string = "http://localhost:5000/api/Account/GetAllUsers";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IUserDetails[]> {
    return this.httpClient.get<IUserDetails[]>(this.apiurl);
  }

  getById(userId: number) {
    return this.httpClient.get(`${this.apiurl}/${userId}`);
  }
}