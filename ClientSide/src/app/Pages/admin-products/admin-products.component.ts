import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';
import { IProduct } from '../../interfaces/i-product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  standalone: true,
  imports: [AdminSidebarComponent]
})
export class AdminProductsComponent implements OnInit {

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
