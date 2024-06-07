import { PersonalDetails } from "./personal_details";

export interface DashboardDetails {
    personal_details: PersonalDetails;
    real_estates : number;
    vehicles : number;
    employees : number;
    dependents : number; 
}