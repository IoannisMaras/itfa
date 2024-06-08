import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dependent } from 'src/app/interfaces/dependent';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dependents-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatProgressSpinnerModule],
  templateUrl: './dependents-page.component.html',
  styleUrls: ['./dependents-page.component.css']
})
export class DependentsPageComponent implements OnInit{

  constructor(private apiService:ApiService,private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.getRequest('dependents/').subscribe({
      next : (response: any) => {
        this.initializeDependentsFormArray(response);
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

  public initializeDependentsFormArray(dependents:Dependent[]): void {
    dependents.forEach(dependent => {
      this.dependentsFormArray.push(new FormGroup({
        id: new FormControl(dependent.id),
        name: new FormControl(dependent.name, [Validators.required]),
        age: new FormControl(dependent.age, [Validators.required, Validators.min(0), Validators.max(120)]),
        gross_income: new FormControl(dependent.gross_income, [Validators.required, Validators.min(0)])
      }));
    });
  }

  dependentsFormArray : FormGroup[] =[];

  onSave($event: any) {
    $event.preventDefault();
    
    const dependents = this.dependentsFormArray.map(dependent => {
      return {
        id: dependent.get('id')!.value,
        name: dependent.get('name')!.value,
        age: dependent.get('age')!.value,
        gross_income: dependent.get('gross_income')!.value
      };
    });

    this.apiService.postRequest('dependents/', {'dependents':dependents}).subscribe({
      next : (response: any) => {
        let successFullSaves = 0;
        let failedSaves = 0;

        response.forEach((dependent: any, index: number) => {

          if(dependent.success){
            successFullSaves++;
            this.dependentsFormArray[index].patchValue(dependent.data);
          }else{
            failedSaves++;
            Object.keys(dependent.data).forEach((key: string) => {
              const formControl = this.dependentsFormArray[index].get(key);
              if (formControl) {
                formControl.markAsTouched();
                formControl.setErrors({ serverError: dependent.data[key] });
              }
            });
          }

          this.snackBar.open(`${successFullSaves} dependents saved successfully. ${failedSaves} failed.`, 'Close');
        });
      },
      error : (error: any) => {
        this.apiService.handleError(error);
      }
    });
  }

  removeDependent(index: number) {
    //check if the dependent is already saved in the database
    if(this.dependentsFormArray[index].get('id')!.value){
      this.apiService.deleteRequest(`dependents/${this.dependentsFormArray[index].get('id')!.value}/`).subscribe({
        next : (response: any) => {
          this.removeDependentFromFormArray(index);
        },
        error : (error: any) => {
          this.apiService.handleError(error);
        }
      });
    }
    else{
      this.removeDependentFromFormArray(index);
    }
  }
  private removeDependentFromFormArray(index: number) {
    this.dependentsFormArray = this.dependentsFormArray.filter((_, i) => i !== index);
  }

  addDependent() {
    this.dependentsFormArray.push(new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(0), Validators.max(120)]),
      gross_income: new FormControl('', [Validators.required, Validators.min(0)])
    }));
  }

}
