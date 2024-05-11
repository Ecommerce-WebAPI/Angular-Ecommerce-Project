import { AuthenticationService } from './../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [RouterLink, RouterLinkActive, CommonModule]
})
export class NavbarComponent {
  constructor(public authenticationService: AuthenticationService, public router:Router){}
  
  isLoggedIn(){
    return this.authenticationService.isLoggedIn();
  }
  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  } 

}
