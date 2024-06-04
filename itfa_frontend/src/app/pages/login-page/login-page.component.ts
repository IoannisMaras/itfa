import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';


interface loginError {
  username?: string;
  password?: string;
}

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  constructor(private authService : AuthService,private apiService : ApiService ,private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.authService.token) {
      this.authService.redirectToDashboard();
    }
  }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  public loginError: loginError | undefined;

  onLogin() {
    //this.snackbar.open('Logging in...', 'Close',);
    this.apiService.postRequest('login/', this.loginForm.value,'json',false).subscribe({
      next : (response: any) => {
          this.authService.setToken(response.token);
      },
      error : (error: any) => {
        if (error.status === 400) {
          this.loginError = {
            username: 'Invalid username or password',
            password: 'Invalid username or password',
          };
        }
        else{
          this.snackbar.open('An error occurred. Please try again.', 'Close',);
        }
      },
      complete : () => {
          this.authService.redirectToDashboard();
      }
  });
  }

  redirectToRegister() {
    this.authService.redirectToRegister();
  }
}
