import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ILoginRequest } from '../../interfaces/i-login-request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(public authenticationService: AuthenticationService, public router:Router){}

  login() {
    const loginRequest: ILoginRequest = {
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string
    };
    this.authenticationService.login(loginRequest).subscribe({
      next:(response)=> {
        this.router.navigate(['/']);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.message,
          timer: 3000,
          showConfirmButton: false,
        });
      },
      error:(error)=> {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.error.message,
          timer: 3000,
          showConfirmButton: false
        });
      }
    })
  }

  isPasswordVisible: boolean = false;
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

}