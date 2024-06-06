export interface Vehicle {
    id?: number;
    vehicle_type: 'car' | 'motorcycle' | 'truck' | 'bus';
    year_of_manufacture: number;
    use_type: 'personal' | 'business';
    value: number;
    user?: number;
}