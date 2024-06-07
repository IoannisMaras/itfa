import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardDetails } from 'src/app/interfaces/dashboard_details';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-ai-recomendations-page',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule,MatIconModule],
  templateUrl: './ai-recomendations-page.component.html',
  styleUrls: ['./ai-recomendations-page.component.css']
})
export class AiRecomendationsPageComponent implements OnInit{
  constructor(private apiService : ApiService,private snackbar : MatSnackBar) { }

  ngOnInit(): void {
      this.apiService.getRequest('dashboard/').subscribe({
        next : (response: DashboardDetails) => {
          if(!response.personal_details){
            this.snackbar.open('Please fill in at least your personal details first', 'Close',);
          }
          this.canGetRecomendations = true;
          this.details = response;
        },
        error : (error: any) => {

          this.apiService.handleError(error);
        },
        complete : () => {
          this.isLoading = false;
        }
      });
  }
  public canGetRecomendations = false;
  public isLoading = false;

  public details:DashboardDetails | undefined;

  public recomendations:string | undefined;
  public isRecomendationsLoading = false;

  public getRecomendations(){
    if(this.isRecomendationsLoading){
      return;
    }
    this.recomendations = undefined;
    this.isRecomendationsLoading = true;
    this.apiService.getRequest('ai-recomendations/').subscribe({
      next : (response: string) => {
        this.recomendations = response
      },
      error : (error: any) => {
        this.apiService.handleError(error);
      },
      complete : () => {
        this.isRecomendationsLoading = false;
      }
    });
  };

  public copyRecomendations(){
    if(this.isRecomendationsLoading){
      return;
    }
    if(this.recomendations){
      navigator.clipboard.writeText(this.recomendations);
      this.snackbar.open('Recomendations copied to clipboard', 'Close', {duration: 2000});
    }
  }
}
