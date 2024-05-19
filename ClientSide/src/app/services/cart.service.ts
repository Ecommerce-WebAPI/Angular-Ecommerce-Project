import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiurl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getCart() {
    return this.http.get(`${this.apiurl}Cart`);
  }

  addToCart(productId: number) {
    return this.http.post(`${this.apiurl}CartItem/${productId}`, {});
  }

  removeFromCart(productId: number) {
    return this.http.delete(`${this.apiurl}CartItem/${productId}`);
  }

  clearCart() {
    return this.http.delete(`${this.apiurl}cart`);
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
