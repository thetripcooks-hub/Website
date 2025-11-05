import { sampleTrip } from "@/data/trips";

export type CartItem = typeof sampleTrip & { quantity: number };
