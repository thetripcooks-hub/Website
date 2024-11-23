"use client";
import useCartStore from "@/stores/cartStore";
import useTripStore from "@/stores/trip-store";
import { CartItem } from "@/types/cart";
import { toast } from "sonner";
import useStripe from "./useStripe";
import { useIsMobile } from "../useIsMobile";

const usePaymentCard = () => {
  const { selectedTrip } = useTripStore();
  const { addToCart, incrementQuantity, items, showCart, setShowCart } =
    useCartStore();

  const handleAddToCart = () => {
    const isMobile = useIsMobile(640);
    if (!selectedTrip) return;

    const foundItem = items.find((item) => item.sys.id === selectedTrip.sys.id);
    if (!showCart && !isMobile) {
      setShowCart(true);
    }
    if (foundItem) {
      incrementQuantity(foundItem);
    } else {
      addToCart({
        ...selectedTrip,
        quantity: 1,
      });
    }
    toast.success("Added to cart");
  };

  const _oneItem = { ...selectedTrip, quantity: 1 } as CartItem;

  const { handlePay } = useStripe({
    items: [_oneItem],
    cancel_url: selectedTrip
      ? `${window.location.origin}/trips/${selectedTrip.sys.id}`
      : undefined,
  });

  return {
    handleAddToCart,
    handlePay,
    selectedTrip,
  };
};

export default usePaymentCard;
