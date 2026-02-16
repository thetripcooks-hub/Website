'use client';

import { useCartStore } from '@/stores/shopifyCartStore';
import Image from 'next/image';
import { X, ShoppingCart, Minus, Plus } from 'lucide-react';

export default function Cart() {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, isLoading } = useCartStore();

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(price));
  };

  const handleCheckout = () => {
    if (cart?.webUrl) {
      window.location.href = cart.webUrl;
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeCart}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Cart</h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {!cart || cart.lineItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingCart className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.lineItems.map((item: any) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    {item.variant.image ? (
                      <Image
                        src={item.variant.image.src}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.variant.title}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {formatPrice(item.variant.price.amount)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={isLoading || item.quantity <= 1}
                        className="p-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={isLoading}
                        className="p-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        disabled={isLoading}
                        className="ml-auto text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart && cart.lineItems.length > 0 && (
          <div className="border-t p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-lg">
              <span className="font-medium">Subtotal</span>
              <span className="font-bold">
                {formatPrice(cart.subtotalPrice.amount)}
              </span>
            </div>

            <p className="text-sm text-gray-600">
              Shipping and taxes calculated at checkout
            </p>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-4 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
