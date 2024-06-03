import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,MatBadgeModule,MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  //constructor(private authService: MsalService ) { }

  public logout() {
    // const logoutRequest = { account: this.authService.instance.getActiveAccount() }
    // this.authService.logout(logoutRequest);
    // localStorage.clear();
  }
}
