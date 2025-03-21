export interface CabinInterface {
    id?: number;
    start_date?: Date;
    name: string;
    max_capacity: number;
    regular_price: number;
    discount: number;
    description: string;
    image: File;
}