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
  @Input() product: any = {} as IProduct;

  flag: boolean = false;
  constructor(private cartService: CartService) {}

  addToFavorites() {
    this.flag = !this.flag;
  }

  addToCart() {
    console.log("add to cart btn is clicked!");
    console.log(`product + ${JSON.stringify(this.product)}`);
    
    this.cartService.addToCart(this.product.id).subscribe({
      next: () => {
        console.log(`Product ${this.product.name} added to cart.`);
      },
      error: (error) => {
        console.error('Adding product to cart failed :(, ', error);
      }
    });
  }
}