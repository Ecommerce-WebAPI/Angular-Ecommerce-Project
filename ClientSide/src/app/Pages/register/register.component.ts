import { RoleService } from './../../services/role.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { IRole } from '../../interfaces/i-role';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
// roles$!: Observable<IRole[]>;
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    fname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/)
    ]),
    
    // password: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(8),
    //   Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    //   // Validators.pattern(/[a-z]/),
    //   // Validators.pattern(/[A-Z]/), 
    //   // Validators.pattern(/\d/),     
    //   // Validators.pattern(/[@$!%*?&]/) 
    // ]),
    confirmPassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    country: new FormControl('', [Validators.required]),

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
  get country() {
    return this.registerForm.controls['country'];
  }
  get phone() {
    return this.registerForm.controls['phone'];
  }

  constructor(public router: Router, public roleService:RoleService, public authenticationService:AuthenticationService) { }
  ngOnInit(): void {
    // this.roles$ = this.roleService.getRoles();
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

  register() {
    console.log("enter register");
    this.authenticationService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => { 
        console.log(error);
      }

   })
  }
}