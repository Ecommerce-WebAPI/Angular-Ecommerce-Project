import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ILoginRequest } from '../../interfaces/i-login-request';
import Swal from 'sweetalert2';
import { VisibilityService } from '../../services/visibility.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false)
  });

  constructor(public authenticationService: AuthenticationService, public router:Router, public visibilityService: VisibilityService, private snackBar: MatSnackBar){}
  ngOnInit() {
    this.visibilityService.changeVisibility(false);
  }

  ngOnDestroy() {
    this.visibilityService.changeVisibility(true);
  }

  private snackBarConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
    panelClass: 'custom-snackbar',
  };

  login() {
    const loginRequest: ILoginRequest = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
      rememberMe: this.loginForm.value.rememberMe!
    };

    console.log(`login request: ${JSON.stringify(loginRequest)}`);
    this.authenticationService.login(loginRequest).subscribe({
      next:(response)=> {
        this.router.navigate(['/']);
        this.snackBar.open(`${response.message} 🥳`, 'Close', this.snackBarConfig);
      },
      error:(error)=> {
        this.snackBar.open(`Login failed 😌`, 'Close', this.snackBarConfig);
      }
    })
  }

  isPasswordVisible: boolean = false;
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}