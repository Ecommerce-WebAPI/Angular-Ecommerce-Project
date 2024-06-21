import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { AdminSidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';
import { IProduct } from '../../interfaces/i-product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  standalone: true,
  imports: [AdminSidebarComponent, CommonModule, RouterLink]
})
export class AdminProductsComponent implements OnInit {

  products: IProduct[];

  productsLength: number;
  constructor(public productService: ProductService) {
    this.products = [];
    this.productsLength = 0;
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        
        this.productsLength = data.length;
        console.log(data.length);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteHandler(productId: number): void {
    this.productService.delete(productId).subscribe({
      next: () => {
        this.products = this.products.filter((product) => product.id !== productId);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
