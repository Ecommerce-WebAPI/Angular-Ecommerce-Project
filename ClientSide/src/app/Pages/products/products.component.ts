import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/i-product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products:IProduct[];
  constructor(public productService: ProductService) { 
    this.products = [];
  }

  ngOnInit():void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
 }
