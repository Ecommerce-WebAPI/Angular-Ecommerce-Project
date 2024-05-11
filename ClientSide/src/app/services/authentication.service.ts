import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginRequest } from '../interfaces/i-login-request';
import { environment } from '../../environments/environment.development';
import { IAuthResponse } from '../interfaces/i-auth-response';
import { IRegisterRequest } from '../interfaces/i-register-request';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private tokenkey = 'token';
  apiurl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(data: ILoginRequest): Observable<IAuthResponse> {
    const url =`${this.apiurl}account/login`;
    console.log('url: '+url);
    return this.http.post<IAuthResponse>(url, data).pipe(
      map((response)=>{
        if(response.isSuccess){
          localStorage.setItem(this.tokenkey, response.token);
        }
        return response;
      })
    );
  }
  register(data: any): Observable<IAuthResponse> {
    const url =`${this.apiurl}account/register`;
    console.log('url: ' + url);
  console.log("From Register on authService:"+ JSON.stringify(data));
    return this.http.post<IAuthResponse>(url, data);
  }

  private getToken():string|null{
    return localStorage.getItem(this.tokenkey) || null;
  }

  private isTokenExpired(token:string){
    const decoded = jwtDecode(token);
    const isExpired = (decoded['exp']! * 1000) <= Date.now();
    if(isExpired){
      this.logout();
    }
    return isExpired;
  }

  isLoggedIn():boolean{
    const token = this.getToken();
    if(!token)return false;
    return !this.isTokenExpired(token);
  }
  
  logout(): void {
    localStorage.removeItem(this.tokenkey);
  }
  
  getUserDetails(){
    const token = this.getToken();
    if(!token)return null;
    const decodedToken: any = jwtDecode(token);
    const userDetails = {
      id:decodedToken.nameid,
      fname: decodedToken.name,
      lname: decodedToken.family_name,
      email: decodedToken.email,
      roles: decodedToken.role || []
    }
    console.log("loggedin user details: "+JSON.stringify(userDetails));
    return userDetails;
  }

}