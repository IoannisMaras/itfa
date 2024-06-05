import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dependents } from 'src/app/interfaces/dependents';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dependents-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgFor,MatProgressSpinnerModule],
  templateUrl: './dependents-page.component.html',
  styleUrls: ['./dependents-page.component.css']
})
export class DependentsPageComponent implements OnInit{

  constructor(private apiService:ApiService) { }

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

  public initializeDependentsFormArray(dependents:Dependents[]): void {
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
    
    // console.log(this.dependentsForm.value);
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
