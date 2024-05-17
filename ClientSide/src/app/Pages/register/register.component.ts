import { RoleService } from './../../services/role.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ILoginRequest } from './../../interfaces/i-login-request';
import { IRegisterRequest } from '../../interfaces/i-register-request';
import { VisibilityService } from '../../services/visibility.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    fname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/)
    ]), 
    confirmPassword: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    address: new FormControl('', [Validators.required]),

  }, {
    validators:this.validatePasswordConfirmation,
  });
  get email() {
    return this.registerForm.controls['email'];
  }
  get fname() {
    return this.registerForm.controls['fname'];
  }
  get lname() {
    return this.registerForm.controls['lname'];
  }
  get password() {
    return this.registerForm.controls['password'];
  }
  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }
  get address() {
    return this.registerForm.controls['address'];
  }
  get phoneNumber() {
    return this.registerForm.controls['phoneNumber'];
  }

  constructor(public router: Router, public roleService:RoleService, public authenticationService:AuthenticationService, public visibilityService: VisibilityService) { }
  
  ngOnInit() {
    this.visibilityService.changeVisibility(false);
  }

  ngOnDestroy() {
    this.visibilityService.changeVisibility(true);
  }
  isPasswordVisible: boolean = false;
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  isConfirmPasswordVisible: boolean = false;
  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  private validatePasswordConfirmation(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  formatPhoneNumber(phoneNumber: string): string {
    // Add country code (+20)
    const formattedNumber = `(+20) ${phoneNumber.substring(0, 3)} ${phoneNumber.substring(3, 6)} ${phoneNumber.substring(6)}`;

    return formattedNumber;
  }

  register() {
    console.log("enter register");
    const registerRequest: IRegisterRequest = {
      email: this.registerForm.value.email as string,
      password: this.registerForm.value.password as string,
      firstName: this.registerForm.value.fname as string,
      lastName: this.registerForm.value.lname as string,
      confirmPassword: this.registerForm.value.confirmPassword as string,
      address: this.registerForm.value.address as string,
      phoneNumber: this.formatPhoneNumber(this.registerForm.value.phoneNumber as string),
      roles: ["User"],
      gender:0,
      ProfileImage:"temp.png"
    };
    this.authenticationService.register(registerRequest).subscribe({
      next: (response) => {
        const loginCredentials: ILoginRequest = {
          email: this.registerForm.value.email as string,
          password: this.registerForm.value.password as string,
        };
        //this.authenticationService.login(loginCredentials);
        this.router.navigate(['/login']);
        console.log(response);
      },
      error: (error) => { 
        console.log(error);
      }
   });
  }
}