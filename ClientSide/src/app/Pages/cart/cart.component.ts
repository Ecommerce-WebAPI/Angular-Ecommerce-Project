import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ICartItem } from '../../interfaces/i-cart-item';
import { CartService } from '../../services/cart.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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
  deliveryCost: number = 0;
  discountMoney: number = 0;
  cartItems: ICartItem[] = [];

  constructor(private cartService: CartService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.cartService.fetchCart().subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  onDeliveryOptionChange(event: any) {
    this.deliveryCost = parseInt(event.target.value, 10);
    this.calculateTotals();
  }
  
  calculateTotals() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateQuantity(item: ICartItem, newQuantity: number) {
    if (newQuantity < 1) return;

    const updatedItem = { ...item, quantity: newQuantity };

    this.cartService.updateCartItem(updatedItem).subscribe({
      next: () => {
        item.quantity = newQuantity;
        this.calculateTotals();
      },
      error: (error) => {
        console.error('Error updating cart item:', error);
      }
    });
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.productId !== productId);
      this.calculateTotals();
    });
  }

  private snackBarConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: 'custom-snackbar',
  };

  applyDiscountCode(discountCode:string){
      if (discountCode === '22 men3m') {
      this.discountMoney = this.totalPrice * 0.1;
      console.log("total price before discount",this.totalPrice);
      
    }
  }

  checkout(discountCode: string) {
    this.totalPrice = this.totalPrice - this.discountMoney;
    console.log("total price after discount",this.totalPrice);
    if(!this.deliveryCost){
      this.deliveryCost = 5; // standard delivery
    }
    this.totalPrice += this.deliveryCost;
    console.log("total price after discount + delivery",this.totalPrice);

    this.cartService.checkout().subscribe(() => {
      this.snackBar.open('Congratulations 🥳🥳', 'Close', this.snackBarConfig);
      this.cartItems = [];
      this.totalPrice = 0;
      this.totalItems = 0;
      this.deliveryCost = 0;
    }, error => {
      this.snackBar.open('Checkout failed 😌', 'Close', this.snackBarConfig);
    });
  }



}
