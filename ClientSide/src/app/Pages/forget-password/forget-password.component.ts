import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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
  constructor(public authenticationService:AuthenticationService,private snackBar: MatSnackBar){}
  private snackBarConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
    panelClass: 'custom-snackbar',
  };
  forgetPassword(){
    this.isSubmitted = true;
    this.authenticationService.forgetPassword(this.email).subscribe({
      next:(response)=>{
        if(response.isSuccess){
          this.showEmailSent=true;
          //this.snackBar.open(response.message, 'Close', this.snackBarConfig);
          this.snackBar.open(`${response.message}🥳`, 'Close', this.snackBarConfig,);
        } 
        else {
          this.snackBar.open(`Please, make sure you've entered your email correctly 😊`, 'Close', this.snackBarConfig);
        }
      },
      error:(error: HttpErrorResponse)=>{
        this.snackBar.open(error.message, 'Close', this.snackBarConfig);
      },
      complete:()=>{
        this.isSubmitted = false;
      }

    })
  }
}