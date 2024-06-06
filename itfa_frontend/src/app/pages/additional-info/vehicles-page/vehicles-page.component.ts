import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Vehicle } from 'src/app/interfaces/vehicle';
@Component({
  selector: 'app-vehicles-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatProgressSpinnerModule],
  templateUrl: './vehicles-page.component.html',
  styleUrls: ['./vehicles-page.component.css']
})
export class VehiclesPageComponent implements OnInit {

  constructor(private apiService:ApiService,private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.getRequest('vehicles/').subscribe({
      next : (response: any) => {
        this.initializeVehiclesFormArray(response);
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

  public initializeVehiclesFormArray(vehicles:Vehicle[]): void {
    vehicles.forEach(vehicle => {
      this.vehiclesFormArray.push(new FormGroup({
        id: new FormControl(vehicle.id),
        vehicle_type: new FormControl(vehicle.vehicle_type, [Validators.required]),
        year_of_manufacture: new FormControl(vehicle.year_of_manufacture, [Validators.required, Validators.min(1900), Validators.max(2024)]),
        use_type: new FormControl(vehicle.use_type, [Validators.required]),
        value: new FormControl(vehicle.value, [Validators.required, Validators.min(0)])
      }));
    });
  }

  vehiclesFormArray : FormGroup[] =[];

  onSave($event: any) {
    $event.preventDefault();
    
    const vehicles = this.vehiclesFormArray.map(vehicle => {
      return {
        id: vehicle.get('id')!.value,
        value: vehicle.get('value')!.value,
        year_of_manufacture: vehicle.get('year_of_manufacture')!.value,
        use_type: vehicle.get('use_type')!.value,
        vehicle_type: vehicle.get('vehicle_type')!.value
      };
    });

    this.apiService.postRequest('vehicles/', vehicles).subscribe({
      next : (response: any) => {
        let successFullSaves = 0;
        let failedSaves = 0;

        response.forEach((vehicle: any, index: number) => {

          if(vehicle.success){
            successFullSaves++;
            this.vehiclesFormArray[index].patchValue(vehicle.data);
          }else{
            failedSaves++;
            Object.keys(vehicle.data).forEach((key: string) => {
              const formControl = this.vehiclesFormArray[index].get(key);
              if (formControl) {
                formControl.markAsTouched();
                formControl.setErrors({ serverError: vehicle.data[key] });
              }
            });
          }

          this.snackBar.open(`${successFullSaves} vehicles saved successfully. ${failedSaves} failed.`, 'Close');
        });
      },
      error : (error: any) => {
        this.apiService.handleError(error);
      }
    });
  }

  removeVehicle(index: number) {
    if(this.vehiclesFormArray[index].get('id')!.value){
      this.apiService.deleteRequest(`vehicles/${this.vehiclesFormArray[index].get('id')!.value}/`).subscribe({
        next : (response: any) => {
          this.removeVehicleFromFormArray(index);
        },
        error : (error: any) => {
          this.apiService.handleError(error);
        }
      });
    }
    else{
      this.removeVehicleFromFormArray(index);
    }
  }
  private removeVehicleFromFormArray(index: number) {
    this.vehiclesFormArray = this.vehiclesFormArray.filter((_, i) => i !== index);
  }

  addVehicle() {
    this.vehiclesFormArray.push(new FormGroup({
      id: new FormControl(null),
      vehicle_type: new FormControl('car', [Validators.required]),
      year_of_manufacture: new FormControl(null, [Validators.required, Validators.min(1900), Validators.max(2024)]),
      use_type: new FormControl('personal', [Validators.required]),
      value: new FormControl(null, [Validators.required, Validators.min(0)])
    }));
  }
}

