import { CommonModule } from '@angular/common';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { IUserDetails } from '../../interfaces/i-user-details';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  getUserDetails$: any;

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.getUserDetails().subscribe({
      next: (res) => {
        this.getUserDetails$ = res; 
        console.log('===> user details JSON:', JSON.stringify(this.getUserDetails$));
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      }
    });
  }
}