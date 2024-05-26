import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productId: any;
  product?: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    private productService: ProductService,
    public router: Router
  ) {}
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.productService.getById(this.productId).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (error) => {
        console.log(error);
      }
  });
    console.log(this.product);
  }
}

