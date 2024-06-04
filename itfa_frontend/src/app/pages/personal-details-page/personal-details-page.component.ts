import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { count } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-personal-details-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatProgressSpinnerModule],
  templateUrl: './personal-details-page.component.html',
  styleUrls: ['./personal-details-page.component.css']
})
export class PersonalDetailsPageComponent implements OnInit{

  constructor(private apiService : ApiService,private snackbar : MatSnackBar) { }

  ngOnInit(): void {
      this.apiService.getRequest('personal-details/').subscribe({
        next : (response: any) => {
          this.personalDetailsForm.patchValue(response);
        },
        error : (error: any) => {
          if(error.status === 404){
            //dont do anything just let the form empty
          }else{
            this.apiService.handleError(error);
          }
        },
        complete : () => {
          this.isLoading = false;
        }
      });
  }

  public isLoading = true;

  personalDetailsForm = new FormGroup({
    gross_income: new FormControl('', [Validators.required, Validators.min(0)]),
    total_expenses: new FormControl('', [Validators.required, Validators.min(0)]),
    age : new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    tax_type : new FormControl('', [Validators.required]),
    country : new FormControl('', [Validators.required]),
  });

  onSave($event: any) {
    $event.preventDefault();
    
    console.log(this.personalDetailsForm.value);

    this.apiService.postRequest('personal-details/', this.personalDetailsForm.value).subscribe({
      next : (response: any) => {
        this.snackbar.open('Personal details saved successfully', 'Close',);
        this.personalDetailsForm.patchValue(response);
      },
      error : (error: any) => {
        if(error.status === 400){
          this.snackbar.open('Invalid data. Please check the form.', 'Close',);
          //get keys of the error object
          const keys = Object.keys(error.error);
          keys.forEach((key) => {
            const formControl = this.personalDetailsForm.get(key);
            if (formControl) {
              formControl.markAsTouched();
              formControl.setErrors({ serverError: error.error[key] });
            }
          });
        }
        else{
          this.apiService.handleError(error);
        }
        
      }
    });
  }

}
