import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ICartItem } from '../../interfaces/i-cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, CartItemComponent]
})
export class CartComponent implements OnInit {
  quantity: number = 1;
  totalPrice: number = 0;
  totalItems: number = 0;
  cartItems: ICartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    console.log("hello 1");
    this.cartService.fetchCart().subscribe(items => {
      this.cartItems = items;
      console.log(`cartItems 1 = ${JSON.stringify(this.cartItems)}`);
      this.calculateTotals();
    });
    console.log("hello 2");
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      console.log(`this.cartItems = ${JSON.stringify(this.cartItems)}`);
      this.calculateTotals();
    });
    console.log("hello 3");
  }

  calculateTotals() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateQuantity(item: ICartItem, quantity: number) {
    if (quantity < 1) return;
    this.cartService.updateCartItem(item.productId, quantity).subscribe();
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId).subscribe();
  }

  clearCart() {
    this.cartService.clearCart().subscribe();
  }
}