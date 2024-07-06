import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProduct } from '../../interfaces/i-product';
import { ICategory } from '../../interfaces/i-category';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CategoriesComponent } from "../../components/categories/categories.component";
import { ProductItemComponent } from "../products/product-item/product-item.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [CommonModule, FormsModule, CarouselModule, RouterLink, CategoriesComponent, ProductItemComponent]
})
export class HomeComponent implements OnInit {
    productId: any;
    product?: any;
    quantity: number = 1;
    relatedProducts: IProduct[] = [];
    currentCategory = '';
    categories: ICategory[] = [];

    constructor(
        public activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private categoryService: CategoryService,
        public router: Router
    ) { }

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

        this.AllCategories();
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

    AllCategories(): void {
        this.categoryService.getAll().subscribe({
            next: (data) => {
                this.categories = data;
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
}
