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

  decreaseQuantity() {
    if (this.item.quantity > 1) {
      this.quantityChange.emit(this.item.quantity - 1);
    }
  }

  increaseQuantity() {
    console.log(`my item is ${JSON.stringify(this.item)}`);
    this.quantityChange.emit(this.item.quantity + 1);
  }

  removeItem() {
    this.remove.emit();
  }
}
