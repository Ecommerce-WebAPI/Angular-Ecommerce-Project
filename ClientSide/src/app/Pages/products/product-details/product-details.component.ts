import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { IProduct } from '../../../interfaces/i-product';
import { ProductItemComponent } from "../product-item/product-item.component";

@Component({
    selector: 'app-product-details',
    standalone: true,
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css'],
    imports: [CommonModule, FormsModule, CarouselModule, RouterLink, ProductItemComponent]
})

export class ProductDetailsComponent implements OnInit {
  productId: any;
  product?: any;
  quantity: number = 1;
  relatedProducts: IProduct[] = [];
  currentCategory = '';

  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: true,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  };

  
  constructor(public activatedRoute: ActivatedRoute, private productService: ProductService, public router: Router) {}

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.productService.getById(this.productId).subscribe({
      next: (data) => {
        this.product = data;
        this.fetchRelatedProducts(this.product.categoryName);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  fetchRelatedProducts(category: string): void {
    this.currentCategory = category;
    this.productService.getByCategory(category).subscribe({
      next: (data) => {
        this.relatedProducts = data.filter(p => p.id !== this.productId);
        this.relatedProducts = data.filter(product => product.categoryName === category);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  incrementQuantity() {
    this.quantity++;
  }
}
