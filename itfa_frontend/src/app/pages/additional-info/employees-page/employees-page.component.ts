import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Employee } from 'src/app/interfaces/employee';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatProgressSpinnerModule],
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.css']
})
export class EmployeesPageComponent implements OnInit {
  constructor(private apiService:ApiService,private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.getRequest('employees/').subscribe({
      next : (response: any) => {
        this.initializeEmployeesFormArray(response);
      },
      error : (error: any) => {

        this.apiService.handleError(error);

      },
      complete : () => {
        this.isLoading = false;
      }
    });
  }
  public isLoading = false;

  public initializeEmployeesFormArray(employees:Employee[]): void {
    employees.forEach(employee => {
      this.employeesFormArray.push(new FormGroup({
        id: new FormControl(employee.id),
        name: new FormControl(employee.name, [Validators.required]),
        age: new FormControl(employee.age, [Validators.required, Validators.min(0), Validators.max(120)]),
        salary: new FormControl(employee.salary, [Validators.required, Validators.min(0)])
      }));
    });
  }

  employeesFormArray : FormGroup[] =[];

  onSave($event: any) {
    $event.preventDefault();
    
    const employees = this.employeesFormArray.map(employee => {
      return {
        id: employee.get('id')!.value,
        name: employee.get('name')!.value,
        age: employee.get('age')!.value,
        salary: employee.get('salary')!.value
      };
    });

    this.apiService.postRequest('employees/', employees).subscribe({
      next : (response: any) => {
        let successFullSaves = 0;
        let failedSaves = 0;

        response.forEach((employee: any, index: number) => {

          if(employee.success){
            successFullSaves++;
            this.employeesFormArray[index].patchValue(employee.data);
          }else{
            failedSaves++;
            Object.keys(employee.data).forEach((key: string) => {
              const formControl = this.employeesFormArray[index].get(key);
              if (formControl) {
                formControl.markAsTouched();
                formControl.setErrors({ serverError: employee.data[key] });
              }
            });
          }

          this.snackBar.open(`${successFullSaves} employees saved successfully. ${failedSaves} failed.`, 'Close');
        });
      },
      error : (error: any) => {
        this.apiService.handleError(error);
      }
    });
  }

  removeEmployee(index: number) {
    if(this.employeesFormArray[index].get('id')!.value){
      this.apiService.deleteRequest(`employees/${this.employeesFormArray[index].get('id')!.value}/`).subscribe({
        next : (response: any) => {
          this.removeEmployeeFromFormArray(index);
        },
        error : (error: any) => {
          this.apiService.handleError(error);
        }
      });
    }
    else{
      this.removeEmployeeFromFormArray(index);
    }
  }
  private removeEmployeeFromFormArray(index: number) {
    this.employeesFormArray = this.employeesFormArray.filter((_, i) => i !== index);
  }

  addEmployee() {
    this.employeesFormArray.push(new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(0), Validators.max(120)]),
      salary: new FormControl('', [Validators.required, Validators.min(0)])
    }));
  }
}
