import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProduct } from '../../../interfaces/i-product';
import { RouterLink } from '@angular/router';

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
  AddToFavorites() {
    this.flag = !this.flag;
  }
}
