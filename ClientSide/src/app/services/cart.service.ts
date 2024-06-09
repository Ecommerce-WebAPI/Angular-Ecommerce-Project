import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICartItem } from './../interfaces/i-cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiurl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCart(): Observable<ICartItem[]> {
    return this.http.get<ICartItem[]>(`${this.apiurl}Cart`);
  }

  addToCart(productId: number): Observable<void> {
    return this.http.post<void>(`${this.apiurl}CartItem/${productId}`, {});
  }

  removeFromCart(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}CartItem/${productId}`);
  }

  updateCartItem(productId: number, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.apiurl}CartItem/${productId}`, { quantity });
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}Cart`);
  }

  // checkout() {
  //   return this.http.post(`${this.apiurl}orders`, {});
  // }

  // getOrders() {
  //   return this.http.get(`${this.apiurl}orders`);
  // }

  // getDeliveryMethods() {
  //   return this.http.get(`${this.apiurl}orders/deliveryMethods`);
  // }

  // getPaymentMethods() {
  //   return this.http.get(`${this.apiurl}orders/paymentMethods`);
  // }

  // getDeliveryMethod(id: number) {
  //   return this.http.get(`${this.apiurl}orders/deliveryMethods/${id}`);
  // }

  // getPaymentMethod(id: number) {
  //   return this.http.get(`${this.apiurl}orders/paymentMethods/${id}`);
  // }

  // getPaymentIntent(id: number) {
  //   return this.http.get(`${this.apiurl}orders/${id}/paymentIntent`);
  // }

  // getBasket(id: number) {
  //   return this.http.get(`${this.apiurl}basket?id=${id}`);
  // }

  // createPaymentIntent(id: number) {
  //   return this.http.post(`${this.apiurl}orders/${id}/paymentIntent`, {});
  // }

  // createOrder(order: any) {
  //   return this.http.post(`${this.apiurl}orders`, order);
  // }

  // getOrdersForUser() {
  //   return this.http.get(`${this.apiurl}orders`);
  // }

  // getOrder(id: number) {
  //   return this.http.get(`${this.apiurl}orders/${id}`);
  // }

  // cancelOrder(id: number) {
  //   return this.http.delete(`${this.apiurl}orders/${id}`);
  // }

  // deleteOrder(id: number) {
  //   return this.http.delete(`${this.apiurl}orders/${id}`);
  // }

  // updateOrder(id: number, order: any) {
  //   return this.http.put(`${this.apiurl}orders/${id}`, order);
  // }

  // updateDeliveryMethod(id: number, deliveryMethodId: number) {
  //   return this.http.put(`${this.apiurl}orders/${id}/delivery`, { deliveryMethodId });
  // }
}
