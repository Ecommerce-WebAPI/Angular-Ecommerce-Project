import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginRequest } from '../interfaces/i-login-request';
import { environment } from '../../environments/environment.development';
import { IAuthResponse } from '../interfaces/i-auth-response';
import { IRegisterRequest } from '../interfaces/i-register-request';
import { IUserDetails } from '../interfaces/i-user-details';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  private tokenkey = 'token';
  apiurl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(data: ILoginRequest): Observable<IAuthResponse> {
    const url =`${this.apiurl}account/login`;
    console.log('login url: '+url);
    return this.http.post<IAuthResponse>(url, data).pipe(
      map((response) => {
        console.log(`login response: ${JSON.stringify(response)}`);
        if(response.isSuccess){
            localStorage.setItem(this.tokenkey, response.token);
            // if(data.remember){
            //   localStorage.setItem(data.email, data.password);
            // }
        }
        return response;
      })
    );
  }

  register(data: IRegisterRequest): Observable<IAuthResponse> {
    const url =`${this.apiurl}account/register`;
    console.log('register url: ' + url);
    //console.log("From Register on authService:"+ JSON.stringify(data));
    return this.http.post<IAuthResponse>(url, data);
  }

  getToken():string|null{
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

  getUserDetails():Observable<IUserDetails>{
    const url = `${this.apiurl}Account/GetUserDetails`;
    console.log(`url of get user detail: ${url}`);
     return this.http.get<IUserDetails>(url);
  }

  logout(): void {
    localStorage.removeItem(this.tokenkey);
  }

  fetchUserDetails(){
    const token = this.getToken();
    if(!token)return null;
    const decodedToken: any = jwtDecode(token);
    const userDetails = {
      id:decodedToken.nameid,
      fname: decodedToken.name,
      lname: decodedToken.family_name,
      email: decodedToken.email,
      address: decodedToken.address,
      phone: decodedToken.phone_number,
      profileImage: decodedToken.picture,
      gender: decodedToken.gender,
      phoneNumber: decodedToken.phone_number,
      phoneNumberConfirmed: decodedToken.phone_number_confirmed,
      twoFactorEnabled: decodedToken.two_factor_enabled,
      accessFailedCount: decodedToken.access_failed_count,
      roles: decodedToken.role || []
    }
    //console.log("loggedin user details: "+JSON.stringify(userDetails));
    return userDetails;
  }

  forgetPassword(email:string): Observable<IAuthResponse>{
    const url = `${this.apiurl}account/forget-password`;
    console.log(`url of forget password: ${url}`);
    return this.http.post<IAuthResponse>(url, {email});
  }
}
