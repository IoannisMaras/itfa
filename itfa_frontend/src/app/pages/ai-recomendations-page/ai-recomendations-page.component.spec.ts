import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiRecomendationsPageComponent } from './ai-recomendations-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AiRecomendationsPageComponent', () => {
  let component: AiRecomendationsPageComponent;
  let fixture: ComponentFixture<AiRecomendationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,AiRecomendationsPageComponent,HttpClientModule,MatSnackBarModule,]
    });
    fixture = TestBed.createComponent(AiRecomendationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
