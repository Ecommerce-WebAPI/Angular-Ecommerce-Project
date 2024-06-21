import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { Router, NavigationEnd } from '@angular/router'
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './Pages/admin-dashboard/admin-dashboard.component';
import { AdminCategoryComponent } from './Pages/admin-category/admin-category.component';
import { AdminProductsComponent } from './Pages/admin-products/admin-products.component';
import { AdminProductFormComponent } from './Pages/admin-products/admin-product-form/admin-product-form.component';
import { CategoryFormComponent } from './Pages/admin-category/category-form/category-form.component';
import { NotfoundComponent } from './Pages/notfound/notfound.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NavbarComponent, FooterComponent, RouterOutlet, CommonModule]
})
export class AppComponent {
  title = 'Ecommerce';

  hideNavbar: boolean = false;
  hideFooter: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = this.router.routerState.snapshot.root.firstChild?.routeConfig?.component;
        this.hideNavbar =
          route === RegisterComponent
          || route === LoginComponent
          || route === AdminDashboardComponent
          || route === AdminCategoryComponent
          || route === AdminProductsComponent
          || route === AdminProductFormComponent
          || route === CategoryFormComponent
          || route ===NotfoundComponent;

        this.hideFooter =
          route === RegisterComponent
          || route === LoginComponent
          || route === AdminDashboardComponent
          || route === AdminCategoryComponent
          || route === AdminProductsComponent
          || route === AdminProductFormComponent
          || route === CategoryFormComponent
          || route ===NotfoundComponent;
      }
    });
  }
}