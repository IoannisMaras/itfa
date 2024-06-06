export interface RealEstate {
    id?: number;
    property_type: 'house' | 'apartment' | 'land' | 'business';
    square_meters: number;
    value: number;
    user?: number;
}