import { CartService } from './../../../services/cart.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICartItem } from '../../../interfaces/i-cart-item';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() item: ICartItem = {} as ICartItem;
  @Output() quantityChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();
  
  constructor(private cartService: CartService) {}

  increaseQuantity() {
    this.item.quantity++;
    this.updateQuantity(this.item, this.item.quantity);
    console.log(`item = ${JSON.stringify(this.item)}`);
  }

  decreaseQuantity() {
    if (this.item.quantity > 1) {
      this.item.quantity--;
      this.updateQuantity(this.item, this.item.quantity);
      console.log(`item = ${JSON.stringify(this.item)}`);
    } else {
      this.cartService.removeFromCart(this.item.productId).subscribe(() => {
        this.remove.emit();
      });
    }
  }

  updateQuantity(item: ICartItem, newQuantity: number) {
    if (newQuantity < 1) return;

    const updatedItem = { ...item, quantity: newQuantity };

    this.cartService.updateCartItem(updatedItem).subscribe({
      next: () => {
        item.quantity = newQuantity;
        this.quantityChange.emit(newQuantity);
        console.log(`Updated item: ${JSON.stringify(item)}`);
      },
      error: (error) => {
        console.error('Error updating cart item:', error);
      },
      complete: () => {
        this.cartService.cartItems$.subscribe(items => {
          this.quantityChange.emit(newQuantity);
        });
      }
    });
  }

  removeItem() {
    this.remove.emit();
  }
}