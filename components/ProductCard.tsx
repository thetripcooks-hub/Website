'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/stores/shopifyCartStore';

interface ProductCardProps {
  product: any; // Shopify product type
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isAdding, setIsAdding] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(selectedVariant.id, 1);
    setIsAdding(false);
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(price));
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.images[0] ? (
          <Image
            src={product.images[0].src}
            alt={product.images[0].altText || product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <p className="text-xl font-bold text-gray-900 mb-4">
          {formatPrice(selectedVariant.price.amount)}
        </p>

        {/* Size Selector */}
        {product.variants.length > 1 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <div className="flex gap-2 flex-wrap">
              {product.variants.map((variant: any) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  disabled={!variant.available}
                  className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                    selectedVariant.id === variant.id
                      ? 'bg-black text-white border-black'
                      : variant.available
                      ? 'bg-white text-gray-900 border-gray-300 hover:border-black'
                      : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  }`}
                >
                  {variant.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant.available || isAdding}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            selectedVariant.available && !isAdding
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isAdding
            ? 'Adding...'
            : selectedVariant.available
            ? 'Add to Cart'
            : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
