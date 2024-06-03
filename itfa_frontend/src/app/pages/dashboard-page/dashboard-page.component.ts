import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {
  constructor(private snackbar : MatSnackBar) { }

  onLogin() {
    this.snackbar.open('Logging in...', 'Close',);
    //this.authService.login(this.loginForm.value);
  }
}
