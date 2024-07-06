import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProduct } from '../../../interfaces/i-product';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product: IProduct = {} as IProduct;

  flag: boolean = false;
  constructor(private cartService: CartService, private snackBar: MatSnackBar) {}

  addToFavorites() {
    this.flag = !this.flag;
  }

  private snackBarConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: 'custom-snackbar',
  };

  addToCart() {
    console.log("add to cart btn is clicked!");
    console.log(`product + ${JSON.stringify(this.product)}`);

    this.cartService.addToCart(this.product.id).subscribe({
      next: () => {
        this.snackBar.open(`${this.product.name} added to the cart 🥳`, 'Close', this.snackBarConfig);
        console.log(`Product ${this.product.name} added to cart.`);
      },
      error: (error) => {
        this.snackBar.open(`Failed to add${this.product.name} to the cart 😌`, 'Close', this.snackBarConfig);
        console.error('Adding product to cart failed :(, ', error);
      }
    });
  }
}
