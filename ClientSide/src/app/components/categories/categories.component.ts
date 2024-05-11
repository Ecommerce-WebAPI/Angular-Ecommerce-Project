
import { Component, OnInit } from '@angular/core';

// Assuming you have an interface/model for product categories
interface Category {
  id: number;
  name: string;
  image: string;
  url: string; 
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [
    { id: 1, name: 'Apparel & Accessories', image: './assets/images/products/product-1.png', url: 'apparel' },
    { id: 2, name: 'Beauty & Wellness', image: './assets/images/products/product-1.png', url: 'beauty' },
    { id: 3, name: 'Electronics & Appliances', image: './assets/images/products/product-1.png', url: 'electronics' },
    { id: 4, name: 'Home & Garden', image: './assets/images/products/product-1.png', url: 'home' },
    { id: 5, name: 'Sports & Outdoors', image: './assets/images/products/product-1.png', url: 'sports' },
  ];

  ngOnInit(): void {

  }
}