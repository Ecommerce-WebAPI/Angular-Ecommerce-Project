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
  paginatedProducts: IProduct[];
  categories: ICategory[];
  activeCategory: string;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalPagesArray: number[];

  constructor(private productService: ProductService, private categoryService: CategoryService) {
    this.products = [];
    this.filteredProducts = [];
    this.paginatedProducts = [];
    this.categories = [];
    this.activeCategory = 'All';
    this.currentPage = 1;
    this.itemsPerPage = 8;
    this.totalPages = 1;
    this.totalPagesArray = [];
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
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    this.paginateProducts();
  }

  paginateProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateProducts();
    }
  }

  trackByProductId(index: number, product: IProduct): number {
    return product.id;
  }
}
