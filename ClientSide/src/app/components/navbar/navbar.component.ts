import { AuthenticationService } from './../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { VisibilityService } from '../../services/visibility.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [RouterLink, RouterLinkActive, CommonModule]
})
export class NavbarComponent implements OnInit {
  isVisible: boolean = true;

  constructor(public authenticationService: AuthenticationService, public visibilityService: VisibilityService, public router:Router){ }

  ngOnInit() {
    this.visibilityService.currentVisibility.subscribe(visible => this.isVisible = visible);
  }
  
  isLoggedIn(){
    return this.authenticationService.isLoggedIn();
  }
  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  } 

}
