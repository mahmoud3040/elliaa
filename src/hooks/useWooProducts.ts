
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
  return useQuery<Product[], Error>({
    queryKey: ['products', params],
    queryFn: async () => {
      const wooProducts = await wooCommerce.getProducts({
        per_page: 100,
        ...params,
      });
      return wooProducts.map(transformWooProductToProduct);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// خطاف جديد للحصول على المنتجات من فئة "home"
export const useHomeProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['home-products'],
    queryFn: async () => {
      const wooProducts = await wooCommerce.getProducts({
        per_page: 100,
        category: 'home', // فلترة بفئة home
      });
      return wooProducts.map(transformWooProductToProduct);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: async () => {
      const wooProduct = await wooCommerce.getProduct(parseInt(id));
      return transformWooProductToProduct(wooProduct);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useCategories = () => {
  return useQuery<Array<{ id: string; name: string; icon: string }>, Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      const wooCategories = await wooCommerce.getCategories();
      // فلترة فئة "home" من القائمة
      return wooCategories
        .filter(cat => cat.slug !== 'home') // إخفاء فئة home
        .map(cat => ({
          id: cat.slug,
          name: cat.name,
          icon: '📁', // يمكنك تخصيص الأيقونات حسب الفئة
        }));
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const getProductById = (id: string): Product | null => {
  // This function is kept for compatibility but will be replaced by useProduct hook
  return null;
};
