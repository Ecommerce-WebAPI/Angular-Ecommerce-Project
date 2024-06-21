import { Component } from '@angular/core';
import { AdminSidebarComponent } from "../../components/admin-sidebar/admin-sidebar.component";
import { ProductsComponent } from "../products/products.component";
import { IProduct } from '../../interfaces/i-product';
import { ProductService } from '../../services/product.service';
import { ICategory } from '../../interfaces/i-category';
import { CategoryService } from '../../services/category.service';
import { IUserDetails } from '../../interfaces/i-user-details';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css',
    imports: [AdminSidebarComponent, ProductsComponent]
})
export class AdminDashboardComponent {
    products: IProduct[];
    categories: ICategory[];
    users: IUserDetails[];
    productsLength: number;
    categoriesLength: number;
    usersLength: number;

    constructor(
        public productService: ProductService,
        public categoryService: CategoryService,
        public userService: UserService) {
        this.products = [];
        this.categories = [];
        this.users = [];
        this.productsLength = 0;
        this.categoriesLength = 0;
        this.usersLength = 0;
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
        this.categoryService.getAll().subscribe({
            next: (data) => {
                this.categories = data;
                this.categoriesLength = data.length;
                console.log(data.length);
            },
            error: (error) => {
                console.log(error);
            }
        });
        this.userService.getAll().subscribe({
            next: (data) => {
                this.users = data;
                this.usersLength = data.length;
                console.log(data.length);
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
}
