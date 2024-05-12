import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { AdminDashboardComponent } from './Pages/admin-dashboard/admin-dashboard.component';
import { NotfoundComponent } from './Pages/notfound/notfound.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { ForgetPasswordComponent } from './Pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent},
  
  // { path: 'products', component: ProductsComponent },
  // { path: 'products/:id', component: ProductDetailsComponent },
  // { path: 'products/:id/edit', component: ProductFormComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'profile/:id', component: ProfileComponent },
  { path: 'admin', component: AdminDashboardComponent },
   
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  { path: '**', component: NotfoundComponent },
];