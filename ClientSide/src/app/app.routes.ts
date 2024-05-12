import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { AdminDashboardComponent } from './Pages/admin-dashboard/admin-dashboard.component';
import { NotfoundComponent } from './Pages/notfound/notfound.component';
import { ProfileComponent } from './Pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {path: 'contact', component: ContactComponent},
  // { path: 'products', component: ProductsComponent },
  // { path: 'products/:id', component: ProductDetailsComponent },
  // { path: 'products/:id/edit', component: ProductFormComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'login', component: LoginComponent },
   { path: 'profile/:id', component: ProfileComponent },
   { path: 'admin', component: AdminDashboardComponent },

  { path: '**', component: NotfoundComponent },
];
