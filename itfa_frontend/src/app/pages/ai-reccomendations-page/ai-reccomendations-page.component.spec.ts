import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiReccomendationsPageComponent } from './ai-reccomendations-page.component';

describe('AiReccomendationsPageComponent', () => {
  let component: AiReccomendationsPageComponent;
  let fixture: ComponentFixture<AiReccomendationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AiReccomendationsPageComponent]
    });
    fixture = TestBed.createComponent(AiReccomendationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
