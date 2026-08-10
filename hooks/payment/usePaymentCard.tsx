"use client";
import useCartStore from "@/stores/cartStore";
import useTripStore from "@/stores/trip-store";
import { CartItem } from "@/types/cart";
import useStripe from "./useStripe";
import { generateTripLink } from "@/lib/utils";

const usePaymentCard = () => {
  const { selectedTrip } = useTripStore();
  const { addToCart, incrementQuantity, items, setLastAddedItem } =
    useCartStore();

  const handleAddToCart = () => {
    if (!selectedTrip) return;
    const foundItem = items.find((item) => item.sys.id === selectedTrip.sys.id);
    if (foundItem) {
      incrementQuantity(foundItem);
      setLastAddedItem(foundItem);
    } else {
      const item = { ...selectedTrip, quantity: 1 };
      addToCart(item);
      setLastAddedItem(item);
    }
  };

  const _oneItem = { ...selectedTrip, quantity: 1 } as CartItem;

  const { handlePay, isPaying } = useStripe({
    items: [_oneItem],
    cancel_url: selectedTrip
      ? `${window.location.origin}${generateTripLink(selectedTrip)}`
      : undefined,
  });

  return {
    handlePay,
    handleAddToCart,
    selectedTrip,
    isPaying,
  };
};

export default usePaymentCard;
