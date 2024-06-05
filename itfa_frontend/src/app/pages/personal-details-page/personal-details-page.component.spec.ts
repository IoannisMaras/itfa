import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetailsPageComponent } from './personal-details-page.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('PersonalDetailsPageComponent', () => {
  let component: PersonalDetailsPageComponent;
  let fixture: ComponentFixture<PersonalDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PersonalDetailsPageComponent,HttpClientModule,MatSnackBarModule]
    });
    fixture = TestBed.createComponent(PersonalDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
