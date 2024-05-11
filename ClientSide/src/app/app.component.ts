import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import {Router, NavigationEnd} from '@angular/router'
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [NavbarComponent,FooterComponent, RouterOutlet]
})
export class AppComponent {
  title = 'Furniture';

  hideNavbar: boolean = true;
  hideFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = this.router.routerState.snapshot.root.firstChild?.routeConfig?.component;
        this.hideNavbar = route === RegisterComponent || route === LoginComponent;
        this.hideFooter = route === RegisterComponent || route === LoginComponent;
      }
    });
  }
}
