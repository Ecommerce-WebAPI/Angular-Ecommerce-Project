import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProduct } from '../../../interfaces/i-product';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';

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
  constructor(private cartService: CartService) {}

  addToFavorites() {
    this.flag = !this.flag;
  }

  addToCart() {
    console.log("add to cart btn is clicked!");
    
    this.cartService.addToCart(this.product.id).subscribe({
      next: () => {
        console.log(`Product ${this.product.name} added to cart.`);
        // Optionally, you can show a success message to the user
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
      }
    });
  }
}