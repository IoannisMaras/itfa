import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DependentsPageComponent } from './dependents-page.component';
import { Dependent } from 'src/app/interfaces/dependent';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('DependentsPageComponent', () => {
  let component: DependentsPageComponent;
  let fixture: ComponentFixture<DependentsPageComponent>;
  const mockDependents: Dependent[] = [
    {
      name: 'John Doe',
      age: 25,
      gross_income: 20000
    },
    {
      name: 'Jane Doe',
      age: 30,
      gross_income: 25000
    },
    {
      name: 'John Smith',
      age: 35,
      gross_income: 30000
    }
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DependentsPageComponent,HttpClientModule,MatSnackBarModule],
      declarations: [] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dependentsFormArray with mockDependents', () => {

   
    // beforeEach(() => {
    component.initializeDependentsFormArray(mockDependents);
    // });

    expect(component.dependentsFormArray.length).toBe(mockDependents.length);
  });

  it('should add a new dependent to dependentsFormArray', () => {
    const initialLength = component.dependentsFormArray.length;
    component.addDependent();
    expect(component.dependentsFormArray.length).toBe(initialLength + 1);
  });

  it('should remove a dependent from dependentsFormArray', () => {
    component.initializeDependentsFormArray(mockDependents);
    const initialLength = component.dependentsFormArray.length;
    component.removeDependent(0);
    expect(component.dependentsFormArray.length).toBe(initialLength - 1);
  });
});
