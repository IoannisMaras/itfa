import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesPageComponent } from './vehicles-page.component';

describe('VehiclesPageComponent', () => {
  let component: VehiclesPageComponent;
  let fixture: ComponentFixture<VehiclesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VehiclesPageComponent]
    });
    fixture = TestBed.createComponent(VehiclesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
