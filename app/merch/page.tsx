'use client';

import { useEffect, useState } from 'react';
import shopifyClient from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import { useCartStore } from '@/stores/shopifyCartStore';
import { ShoppingCart } from 'lucide-react';

export default function MerchPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);  // ADDED
  
  const { cart, openCart } = useCartStore();

  // Mount check
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch products
  useEffect(() => {
    if (mounted) {
      fetchProducts();
    }
  }, [mounted]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all products from Shopify
      const fetchedProducts = await shopifyClient.product.fetchAll();
      setProducts(fetchedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please check your Shopify connection.');
    } finally {
      setLoading(false);
    }
  };

  // Return null until mounted (prevents hydration errors)
  if (!mounted) return null;

  const cartItemCount = cart?.lineItems?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Trip Cooks Merch</h1>
              <p className="text-gray-600 mt-1">Official merchandise collection</p>
            </div>
            
            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 font-medium">{error}</p>
            <button
              onClick={fetchProducts}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products available yet.</p>
            <p className="text-gray-500 mt-2">Check back soon for new merch!</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      <Cart />
    </div>
  );
}