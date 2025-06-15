
import { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { supabase } from '@/lib/supabase';

export const useStoreProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        // Fallback to static products if database is empty or error occurs
        const { products: staticProducts } = await import('@/data/products');
        setProducts(staticProducts);
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error:', error);
      // Fallback to static products
      const { products: staticProducts } = await import('@/data/products');
      setProducts(staticProducts);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    fetchProducts
  };
};
