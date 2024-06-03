import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dependents } from 'src/app/interfaces/dependents';

@Component({
  selector: 'app-dependents-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgFor],
  templateUrl: './dependents-page.component.html',
  styleUrls: ['./dependents-page.component.css']
})
export class DependentsPageComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
    
  }

  public initializeDependentsFormArray(dependents:Dependents[]): void {
    dependents.forEach(dependent => {
      this.dependentsFormArray.push(new FormGroup({
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
    this.dependentsFormArray = this.dependentsFormArray.filter((_, i) => i !== index);
  }

  addDependent() {
    this.dependentsFormArray.push(new FormGroup({
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(0), Validators.max(120)]),
      gross_income: new FormControl('', [Validators.required, Validators.min(0)])
    }));
  }

}
