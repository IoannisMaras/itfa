import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,MatBadgeModule,MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private apiService :ApiService, private authSerivce:AuthService) { }

  public logout() {
    this.apiService.postRequest('logout/',{}).subscribe({
      next : (response: any) => {
        this.authSerivce.logout();
      },
      error : (error: any) => {
        console.log(error);
      }
    });
  }
}
