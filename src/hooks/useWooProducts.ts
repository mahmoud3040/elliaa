import { useQuery } from '@tanstack/react-query';
import { wooCommerce, WooProduct, WooVariation } from '@/lib/woocommerce';

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
  type: string;
  attributes: Array<{
    id: number;
    name: string;
    options: string[];
  }>;
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
    }, {} as Record<string, string>),
    type: wooProduct.type,
    attributes: wooProduct.attributes.map(attr => ({
      id: attr.id,
      name: attr.name,
      options: attr.options
    }))
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
      console.log('🔍 Fetching home products...');
      
      // جلب جميع الفئات أولاً لمعرفة ID فئة home
      const categories = await wooCommerce.getCategories();
      console.log('📂 All categories:', categories);
      
      const homeCategory = categories.find(cat => cat.slug === 'home');
      console.log('🏠 Home category found:', homeCategory);
      
      if (!homeCategory) {
        console.warn('⚠️ Home category not found!');
        return [];
      }
      
      const wooProducts = await wooCommerce.getProducts({
        per_page: 100,
        category: homeCategory.id.toString(), // استخدام ID بدلاً من slug
      });
      
      console.log('🛍️ Raw WooCommerce products from home category:', wooProducts);
      console.log('📊 Number of products found:', wooProducts.length);
      
      const transformedProducts = wooProducts.map(transformWooProductToProduct);
      console.log('✨ Transformed products:', transformedProducts);
      
      return transformedProducts;
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
  return useQuery<Array<{ id: string; name: string; icon: string; image: string }>, Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      const wooCategories = await wooCommerce.getCategories();
      console.log('📂 Raw WooCommerce categories:', JSON.stringify(wooCategories, null, 2));
      
      // فلترة فئة "home" من القائمة
      const filteredCategories = wooCategories
        .filter(cat => cat.slug !== 'home') // إخفاء فئة home
        .map(cat => {
          console.log(`🔍 Processing category ${cat.name}:`, cat);
          return {
            id: cat.slug,
            name: cat.name,
            icon: '📁',
            image: cat.image?.src || '/placeholder.svg',
          };
        });
        
      console.log('🎯 Final transformed categories:', JSON.stringify(filteredCategories, null, 2));
      return filteredCategories;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const getProductById = (id: string): Product | null => {
  // This function is kept for compatibility but will be replaced by useProduct hook
  return null;
};

export const useProductVariations = (productId: string) => {
  return useQuery<WooVariation[], Error>({
    queryKey: ['product-variations', productId],
    queryFn: async () => {
      if (!productId) return [];
      const variations = await wooCommerce.getProductVariations(parseInt(productId));
      return variations;
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
