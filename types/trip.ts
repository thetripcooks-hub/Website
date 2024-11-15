import { sampleTrip } from "@/data/trips";

export type Trip = {
  id: number | string;
  isBooked: boolean;
  quantity: number;
  price: number;
  startDate: string;
  endDate: string;
  totalQuantity: number;
  //   month: string;
  year: string;
  image: string | null;
  location: string;
};

// installment type
type InstallmentPaymentType = "deposit" | "installment" | "full";

export type Installment = {
  type: InstallmentPaymentType;
  amount: number;
  installment_number: number;
  date: string;
};

export type WhatsIncluded = {
  icon: any;
  title: string;
  isHightlighted?: boolean;
};

export type Itinerary = {
  day: number;
  activity: string;
  description?: string;
  coverImage: any;
};

export type TripType = typeof sampleTrip;

export interface AllTripsResponse {
  data: {
    tripCollection: {
      items: TripType[];
    };
  };
}

export interface TripByIdResponse {
  data: {
    trip: TripType;
  };
}
