import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { ICartItem } from './../interfaces/i-cart-item';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiurl: string = environment.apiUrl;
  private cartItemsSubject = new BehaviorSubject<ICartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private cartIdSubject = new BehaviorSubject<number | null>(null);
  cartId$ = this.cartIdSubject.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  fetchCartId(): Observable<number | null> {
    return this.http.get<any[]>(`${this.apiurl}Cart`, { 
      headers: this.getHeaders() 
    }).pipe(
      map(cartInfo => cartInfo.length > 0 ? cartInfo[0].id : null),
      tap(cartId => this.cartIdSubject.next(cartId))
    );
  }

  getUserCartItemsByCartId(cartId: number): Observable<ICartItem[]> {
    return this.http.get<ICartItem[]>(`${this.apiurl}Cart/GetUserCartItemsByCartID/${cartId}`, {
      headers: this.getHeaders()
    }).pipe(
      tap(items => this.cartItemsSubject.next(items))
    );
  }

  fetchCart(): Observable<ICartItem[]> {
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
  
  addToCart(productId: number) {
    console.log("add 2 cart called from service");
    return this.http.post(`${this.apiurl}Cart/${productId}`, {}, { 
      headers: this.getHeaders() 
    }).pipe(
      tap(() => this.fetchCart().subscribe())
    );
  }

  removeFromCart(productId: number){
    return this.http.delete(`${this.apiurl}CartItem/${productId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      tap(() => this.fetchCart().subscribe())
    );
  }

  updateCartItem(item: ICartItem) {
    const url = `${this.apiurl}CartItem/${item.productId}`;
    console.log(`method: update, url: ${url}`);
    
    return this.http.put(url, item, {
      headers: this.getHeaders()
    }).pipe(
      tap(() => this.fetchCart().subscribe())
    );
}


  checkout() {
    const url = `${this.apiurl}CartItem/checkout`;
    console.log(`method: checkout, url: ${url}`);

    return this.http.post(url, {}, {
      headers: this.getHeaders()
    }).pipe(
      tap(() => {
        this.fetchCart().subscribe();
      }),
      catchError(error => {
        console.error('Error during checkout:', error);
        return throwError(error);
      })
    );
  }

}
