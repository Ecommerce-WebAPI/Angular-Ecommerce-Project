import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  email:string="";
  isSubmitted:boolean=false;
  showEmailSent:boolean=false;
  constructor(public authenticationService:AuthenticationService){}
  forgetPassword(){
    this.isSubmitted = true;
    this.authenticationService.forgetPassword(this.email).subscribe({
      next:(response)=>{
        if(response.isSuccess){
          this.showEmailSent=true;
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.message,
            timer: 3000,
            showConfirmButton: false,
          });
        } 
        else {
          Swal.fire({
            icon: 'error',
            title: 'Requesting reset password failed',
            text: response.message,
            timer: 3000,
            showConfirmButton: false,
          });
        }
      },
      error:(error: HttpErrorResponse)=>{
        Swal.fire({
          icon: 'error',
          title: 'Error Occured While Requesting Reset Password',
          text: error.message,
          timer: 3000,
          showConfirmButton: false,
        });
      },
      complete:()=>{
        this.isSubmitted = false;
      }

    })
  }
}