import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RealEstate } from 'src/app/interfaces/real_estate';

@Component({
  selector: 'app-real-estate-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatProgressSpinnerModule],
  templateUrl: './real-estate-page.component.html',
  styleUrls: ['./real-estate-page.component.css']
})
export class RealEstatePageComponent implements OnInit {
  constructor(private apiService:ApiService,private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.getRequest('real-estates/').subscribe({
      next : (response: any) => {
        this.initializeRealEstatesFormArray(response);
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

  public initializeRealEstatesFormArray(realEstates:RealEstate[]): void {
    realEstates.forEach(realEstate => {
      this.realEstatesFormArray.push(new FormGroup({
        id: new FormControl(realEstate.id),
        property_type: new FormControl(realEstate.property_type, [Validators.required]),
        square_meters: new FormControl(realEstate.square_meters, [Validators.required, Validators.min(0), Validators.max(1000)]),
        value: new FormControl(realEstate.value, [Validators.required, Validators.min(0)])
      }));
    });
  }

  realEstatesFormArray : FormGroup[] =[];

  onSave($event: any) {
    $event.preventDefault();
    
    const real_estates = this.realEstatesFormArray.map(realEstate => {
      return {
        id: realEstate.get('id')!.value,
        property_type: realEstate.get('property_type')!.value,
        square_meters: realEstate.get('square_meters')!.value,
        value: realEstate.get('value')!.value
      };
    });

    this.apiService.postRequest('real-estates/', real_estates).subscribe({
      next : (response: any) => {
        let successFullSaves = 0;
        let failedSaves = 0;

        response.forEach((realEstate: any, index: number) => {

          if(realEstate.success){
            successFullSaves++;
            this.realEstatesFormArray[index].patchValue(realEstate.data);
          }else{
            failedSaves++;
            Object.keys(realEstate.data).forEach((key: string) => {
              const formControl = this.realEstatesFormArray[index].get(key);
              if (formControl) {
                formControl.markAsTouched();
                formControl.setErrors({ serverError: realEstate.data[key] });
              }
            });
          }

          this.snackBar.open(`${successFullSaves} real estates saved successfully. ${failedSaves} failed.`, 'Close');
        });
      },
      error : (error: any) => {
        this.apiService.handleError(error);
      }
    });
  }

  removeRealEstate(index: number) {
    if(this.realEstatesFormArray[index].get('id')!.value){
      this.apiService.deleteRequest(`real-estates/${this.realEstatesFormArray[index].get('id')!.value}/`).subscribe({
        next : (response: any) => {
          this.removeRealEstateFromFormArray(index);
        },
        error : (error: any) => {
          this.apiService.handleError(error);
        }
      });
    }
    else{
      this.removeRealEstateFromFormArray(index);
    }
  }
  private removeRealEstateFromFormArray(index: number) {
    this.realEstatesFormArray = this.realEstatesFormArray.filter((_, i) => i !== index);
  }

  addRealEstate() {
    this.realEstatesFormArray.push(new FormGroup({
      id: new FormControl(null),
      property_type: new FormControl('house', [Validators.required]),
      square_meters: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1000)]),
      value: new FormControl(null, [Validators.required, Validators.min(0)])
    }));
  }
}

