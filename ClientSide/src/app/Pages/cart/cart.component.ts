import { Component } from '@angular/core';
import { CartItemComponent } from "./cart-item/cart-item.component";

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [CartItemComponent]
})
export class CartComponent {
  quantity: number = 1; 

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }
}