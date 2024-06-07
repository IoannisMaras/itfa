import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiRecomendationsPageComponent } from './ai-recomendations-page.component';

describe('AiRecomendationsPageComponent', () => {
  let component: AiRecomendationsPageComponent;
  let fixture: ComponentFixture<AiRecomendationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AiRecomendationsPageComponent]
    });
    fixture = TestBed.createComponent(AiRecomendationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
