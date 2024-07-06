import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRole } from '../interfaces/i-role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl=environment.apiUrl;
  constructor(public http: HttpClient) { }
  
  getRoles(){
    const url = `${this.apiUrl}roles`;
    console.log(url);
    this.http.get<IRole[]>(url);
  }


  
}
