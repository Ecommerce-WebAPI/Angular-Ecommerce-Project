import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { AdminDashboardComponent } from './Pages/admin-dashboard/admin-dashboard.component';
import { NotfoundComponent } from './Pages/notfound/notfound.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { ProductFormComponent } from './Pages/products/product-form/product-form.component';
import { ProductDetailsComponent } from './Pages/products/product-details/product-details.component';
import { ProductsComponent } from './Pages/products/products.component';
import { AdminProductsComponent } from './Pages/admin-products/admin-products.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {path: 'contact', component: ContactComponent},
  { path: 'adminproducts', component: AdminProductsComponent},
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'adminproducts/:id/edit', component: ProductFormComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'login', component: LoginComponent },
   { path: 'profile/:id', component: ProfileComponent },
   { path: 'admin', component: AdminDashboardComponent },

  { path: '**', component: NotfoundComponent },
];
