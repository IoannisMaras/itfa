import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const defaultRoutes: Routes = [
  {path:'dashboard', pathMatch: 'full', loadComponent: () => import('./pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent)},
  {path:'personal-details', pathMatch: 'full', loadComponent: () => import('./pages/personal-details-page/personal-details-page.component').then(m => m.PersonalDetailsPageComponent)},
//{path:'additional-info', pathMatch: 'full', loadComponent: () => import('./pages/additional-info-page/additional-info-page.component').then(m => m.AdditionalInfoPageComponent)},
  {path:'additional-info/dependents', pathMatch: 'full', loadComponent: () => import('./pages/additional-info/dependents-page/dependents-page.component').then(m => m.DependentsPageComponent)},
  {path:'additional-info/employees', pathMatch: 'full', loadComponent: () => import('./pages/additional-info/employees-page/employees-page.component').then(m => m.EmployeesPageComponent)},
  {path:'additional-info/real-estate', pathMatch: 'full', loadComponent: () => import('./pages/additional-info/real-estate-page/real-estate-page.component').then(m => m.RealEstatePageComponent)},
  {path:'additional-info/vehicles', pathMatch: 'full', loadComponent: () => import('./pages/additional-info/vehicles-page/vehicles-page.component').then(m => m.VehiclesPageComponent)},
  {path:'ai-recomendations', pathMatch: 'full', loadComponent: () => import('./pages/ai-recomendations-page/ai-recomendations-page.component').then(m => m.AiRecomendationsPageComponent)},
];

const routes: Routes = [
  { path: '', component: DefaultComponent, children: defaultRoutes, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
