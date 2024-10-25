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
