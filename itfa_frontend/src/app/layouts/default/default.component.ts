//--------------------------------------------------------------------------
// Core - RxJs
//--------------------------------------------------------------------------
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
//--------------------------------------------------------------------------
// Material
//--------------------------------------------------------------------------
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
//--------------------------------------------------------------------------
// Services
//--------------------------------------------------------------------------
import { LayoutService } from 'src/app/services/layout.service';
//--------------------------------------------------------------------------
// Components
//--------------------------------------------------------------------------
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SidenavComponent } from 'src/app/components/sidenav/sidenav.component';
import { RouterTestingModule } from '@angular/router/testing';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  standalone: true,
  imports: [CommonModule, RouterTestingModule, MatSidenavModule, MatIconModule, HeaderComponent, SidenavComponent],
})
export class DefaultComponent implements OnInit {

  constructor(private layoutService: LayoutService,private router : Router) { }

  public isMobile$ = this.layoutService.isMobile$;
  ngOnInit(): void {
    this.router.navigate(['/dashboard']);
  }

}