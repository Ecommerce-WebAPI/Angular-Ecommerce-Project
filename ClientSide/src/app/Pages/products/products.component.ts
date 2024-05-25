import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/i-product';
import { ICategory } from '../../interfaces/i-category';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: IProduct[];
  filteredProducts: IProduct[];
  categories: ICategory[];
  activeCategory: string;

  constructor(private productService: ProductService, private categoryService: CategoryService) {
    this.products = [];
    this.filteredProducts = [];
    this.categories = [];
    this.activeCategory = 'All';
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.filterProducts('All');
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterProducts(category: string): void {
    this.activeCategory = category;
    if (category === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.categoryName === category);
    }
  }

  trackByProductId(index: number, product: IProduct): number {
    return product.id;
  }
}
