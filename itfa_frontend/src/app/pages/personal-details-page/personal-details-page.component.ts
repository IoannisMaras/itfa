import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { count } from 'rxjs';

@Component({
  selector: 'app-personal-details-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './personal-details-page.component.html',
  styleUrls: ['./personal-details-page.component.css']
})
export class PersonalDetailsPageComponent {

  constructor() { }

  personalDetailsForm = new FormGroup({
    gross_income: new FormControl('', [Validators.required, Validators.min(0)]),
    total_expenses: new FormControl('', [Validators.required, Validators.min(0)]),
    age : new FormControl('', [Validators.required, Validators.min(0), Validators.max(120)]),
    tax_type : new FormControl('', [Validators.required]),
    country : new FormControl('', [Validators.required]),
  });

  onSave($event: any) {
    $event.preventDefault();
    
    console.log(this.personalDetailsForm.value);
  }

}
