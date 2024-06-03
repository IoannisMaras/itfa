import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultComponent } from './default.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SidenavComponent } from 'src/app/components/sidenav/sidenav.component';

describe('DefaultComponent', () => {
  let component: DefaultComponent;
  let fixture: ComponentFixture<DefaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DefaultComponent,BrowserAnimationsModule,MatSidenavModule, MatIconModule, HeaderComponent, SidenavComponent]
    });
    fixture = TestBed.createComponent(DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
