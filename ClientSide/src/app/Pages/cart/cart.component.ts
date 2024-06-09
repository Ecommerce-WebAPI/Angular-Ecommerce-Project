import { Component, OnInit } from '@angular/core';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { ICartItem } from '../../interfaces/i-cart-item';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [CartItemComponent]
})
export class CartComponent implements OnInit {
  
  quantity: number = 1; 
  totalPrice: number = 0;
  totalItems: number = 0;
  cartItems: ICartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateQuantity(item: ICartItem, quantity: number) {
    if (quantity < 1) return;
    item.quantity = quantity;
    this.cartService.updateCartItem(item.productId, item.quantity).subscribe(() => {
      this.calculateTotals();
    });
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.productId !== productId);
      this.calculateTotals();
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => {
      this.cartItems = [];
      this.totalPrice = 0;
      this.totalItems = 0;
    });
  }
}