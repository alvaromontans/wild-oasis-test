export interface BookingInterface {
    id?: number;
    created_at: Date;
    start_date: Date;
    end_date: Date;
    num_nights: number;
    num_guests: number;
    cabin_price: number;
    extras_price: number;
    total_price: number;
    status: "unconfirmed" | "checked-in" | "checked-out";
    has_breakfast: boolean;
    is_paid: boolean;
    observations: string;
    cabin_id: number;
    guest_id: number;
    cabins: { name: string };
    guests: {
        full_name: string, email: string, nationality: string,
        country_flag: string, national_ID: string,
        country: string
    };
}