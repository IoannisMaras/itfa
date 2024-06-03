import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sidenavItems } from './sidenav-item';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { sidenavItemsInterface } from 'src/app/interfaces/sidenav-items';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule,RouterModule, MatIconModule,MatExpansionModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  public sidenavItems: sidenavItemsInterface[] = sidenavItems

  urlSrartsWith(url: string): boolean {
    return window.location.href.indexOf(url) > -1
  }
}
