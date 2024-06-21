import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { ICartItem } from './../interfaces/i-cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiurl: string = environment.apiUrl;
  private cartItemsSubject = new BehaviorSubject<ICartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private cartIdSubject = new BehaviorSubject<number | null>(null);
  cartId$ = this.cartIdSubject.asObservable();

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  fetchCartId(): Observable<number | null> {
    console.log("fetch cart id called from service");
    return this.http.get<any[]>(`${this.apiurl}Cart`, { 
      headers: this.getHeaders() 
    }).pipe(
      map(cartInfo => cartInfo.length > 0 ? cartInfo[0].id : null),
      tap(cartId => this.cartIdSubject.next(cartId))
    );
  }

  getUserCartItemsByCartId(cartId: number): Observable<ICartItem[]> {
    console.log("get user cart items by cart id called from service");
    return this.http.get<ICartItem[]>(`${this.apiurl}Cart/GetUserCartItemsByCartID/${cartId}`, {
      headers: this.getHeaders()
    }).pipe(
      tap(items => this.cartItemsSubject.next(items))
    );
  }

  fetchCart(): Observable<ICartItem[]> {
    console.log("fetch cart called from service");
    return this.fetchCartId().pipe(
      switchMap(cartId => {
        if (cartId !== null) {
          return this.getUserCartItemsByCartId(cartId);
        } else {
          return new Observable<ICartItem[]>(subscriber => subscriber.next([]));
        }
      })
    );
  }
  
  addToCart(productId: number): Observable<void> {
    console.log("add 2 cart called from service");
    return this.http.post<void>(`${this.apiurl}Cart/${productId}`, {}, { 
      headers: this.getHeaders() 
    }).pipe(
      tap(() => this.fetchCart().subscribe())
    );
  }

  removeFromCart(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}Cart/${productId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      tap(() => this.fetchCart().subscribe())
    );
  }

  updateCartItem(productId: number, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.apiurl}Cart/${productId}`, { quantity }, { 
      headers: this.getHeaders() 
    }).pipe(
      tap(() => this.fetchCart().subscribe())
    );
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}Cart`, { 
      headers: this.getHeaders() 
    }).pipe(
      tap(() => this.fetchCart().subscribe())
    );
  }
}
