import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstatePageComponent } from './real-estate-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('RealEstatePageComponent', () => {
  let component: RealEstatePageComponent;
  let fixture: ComponentFixture<RealEstatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,RealEstatePageComponent,HttpClientModule,MatSnackBarModule],
      declarations: [] 
    }).compileComponents();
  });
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RealEstatePageComponent]
    });
    fixture = TestBed.createComponent(RealEstatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
