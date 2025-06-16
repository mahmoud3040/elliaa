
import { useQuery } from '@tanstack/react-query';
import { wooCommerce, WooProduct } from '@/lib/woocommerce';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isOnSale: boolean;
  features: string[];
  specifications?: Record<string, string>;
}

const transformWooProductToProduct = (wooProduct: WooProduct): Product => {
  return {
    id: wooProduct.id.toString(),
    name: wooProduct.name,
    price: parseFloat(wooProduct.price || wooProduct.regular_price),
    originalPrice: wooProduct.on_sale ? parseFloat(wooProduct.regular_price) : undefined,
    description: wooProduct.short_description || wooProduct.description,
    image: wooProduct.images[0]?.src || '/placeholder.svg',
    images: wooProduct.images.map(img => img.src),
    category: wooProduct.categories[0]?.name || 'منتجات',
    rating: parseFloat(wooProduct.average_rating) || 4.5,
    reviewCount: wooProduct.rating_count || 0,
    isNew: wooProduct.featured,
    isOnSale: wooProduct.on_sale,
    features: wooProduct.attributes.map(attr => `${attr.name}: ${attr.options.join(', ')}`),
    specifications: wooProduct.attributes.reduce((specs, attr) => {
      specs[attr.name] = attr.options.join(', ');
      return specs;
    }, {} as Record<string, string>)
  };
};

export const useProducts = (params?: {
  search?: string;
  category?: string;
  featured?: boolean;
  onSale?: boolean;
}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const wooProducts = await wooCommerce.getProducts({
        per_page: 100,
        ...params,
      });
      return wooProducts.map(transformWooProductToProduct);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const wooProduct = await wooCommerce.getProduct(parseInt(id));
      return transformWooProductToProduct(wooProduct);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const wooCategories = await wooCommerce.getCategories();
      return wooCategories.map(cat => ({
        id: cat.slug,
        name: cat.name,
        icon: '📁', // يمكنك تخصيص الأيقونات حسب الفئة
      }));
    },
    staleTime: 10 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};

export const getProductById = (id: string): Product | null => {
  // This function is kept for compatibility but will be replaced by useProduct hook
  return null;
};
