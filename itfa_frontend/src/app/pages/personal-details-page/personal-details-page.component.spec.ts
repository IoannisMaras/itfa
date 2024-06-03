import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetailsPageComponent } from './personal-details-page.component';

describe('PersonalDetailsPageComponent', () => {
  let component: PersonalDetailsPageComponent;
  let fixture: ComponentFixture<PersonalDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PersonalDetailsPageComponent]
    });
    fixture = TestBed.createComponent(PersonalDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
