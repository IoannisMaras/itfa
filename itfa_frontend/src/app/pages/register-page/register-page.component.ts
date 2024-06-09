import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface registerError {
  username?: string;
  password?: string;
}

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  constructor(private authService : AuthService,private apiService : ApiService ,private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.authService.token) {
      this.authService.redirectToDashboard();
    }
  }

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  public registerError: registerError | undefined;

  onRegister() {
    this.apiService.postRequest('register/', this.registerForm.value,'json',false).subscribe({
      next : (response: any) => {
          this.authService.setToken(response.token);
      },
      error : (error: any) => {
        if (error.status === 400) {
          this.registerError = {
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

  redirectToLogin() {
    this.authService.redirectToLogin();
  }
}
