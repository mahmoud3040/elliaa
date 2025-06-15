import { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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
        toast({
          title: "خطأ في جلب المنتجات",
          description: "حدث خطأ أثناء جلب المنتجات من قاعدة البيانات",
          variant: "destructive",
        });
        return;
      }

      // Transform database format to frontend format
      const transformedProducts = data?.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: parseFloat(item.price),
        originalPrice: item.original_price ? parseFloat(item.original_price) : undefined,
        category: item.category,
        image: item.image,
        images: item.images || [item.image],
        stock: item.stock,
        sku: item.sku,
        weight: item.weight ? parseFloat(item.weight) : undefined,
        isNew: item.is_new,
        isFeatured: item.is_featured,
        isOnSale: item.is_on_sale,
        features: item.features || [],
        specifications: item.specifications || {},
        rating: item.rating ? parseFloat(item.rating) : 4.5,
        reviews: item.reviews || 0,
        reviewCount: item.review_count || 0,
        dimensions: item.dimensions || { length: 20, width: 15, height: 5 }
      })) || [];

      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "خطأ في الاتصال",
        description: "تعذر الاتصال بقاعدة البيانات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Product) => {
    try {
      // Transform frontend format to database format
      const dbProduct = {
        name: product.name,
        description: product.description,
        price: product.price,
        original_price: product.originalPrice,
        category: product.category,
        image: product.image,
        images: product.images,
        stock: product.stock,
        sku: product.sku,
        weight: product.weight,
        is_new: product.isNew,
        is_featured: product.isFeatured,
        is_on_sale: product.isOnSale,
        features: product.features,
        specifications: product.specifications,
        rating: product.rating,
        reviews: product.reviews,
        review_count: product.reviewCount,
        dimensions: product.dimensions
      };

      const { data, error } = await supabase
        .from('products')
        .insert([dbProduct])
        .select()
        .single();

      if (error) {
        console.error('Error adding product:', error);
        toast({
          title: "خطأ في إضافة المنتج",
          description: "حدث خطأ أثناء إضافة المنتج",
          variant: "destructive",
        });
        return false;
      }

      // Transform back to frontend format
      const transformedProduct = {
        id: data.id,
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        originalPrice: data.original_price ? parseFloat(data.original_price) : undefined,
        category: data.category,
        image: data.image,
        images: data.images || [data.image],
        stock: data.stock,
        sku: data.sku,
        weight: data.weight ? parseFloat(data.weight) : undefined,
        isNew: data.is_new,
        isFeatured: data.is_featured,
        isOnSale: data.is_on_sale,
        features: data.features || [],
        specifications: data.specifications || {},
        rating: data.rating ? parseFloat(data.rating) : 4.5,
        reviews: data.reviews || 0,
        reviewCount: data.review_count || 0,
        dimensions: data.dimensions || { length: 20, width: 15, height: 5 }
      };

      setProducts(prev => [transformedProduct, ...prev]);
      toast({
        title: "تم إضافة المنتج",
        description: "تم إضافة المنتج بنجاح",
      });
      return true;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "خطأ في الاتصال",
        description: "تعذر الاتصال بقاعدة البيانات",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      // Transform frontend format to database format
      const dbProduct = {
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        original_price: updatedProduct.originalPrice,
        category: updatedProduct.category,
        image: updatedProduct.image,
        images: updatedProduct.images,
        stock: updatedProduct.stock,
        sku: updatedProduct.sku,
        weight: updatedProduct.weight,
        is_new: updatedProduct.isNew,
        is_featured: updatedProduct.isFeatured,
        is_on_sale: updatedProduct.isOnSale,
        features: updatedProduct.features,
        specifications: updatedProduct.specifications,
        rating: updatedProduct.rating,
        reviews: updatedProduct.reviews,
        review_count: updatedProduct.reviewCount,
        dimensions: updatedProduct.dimensions,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('products')
        .update(dbProduct)
        .eq('id', updatedProduct.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating product:', error);
        toast({
          title: "خطأ في تحديث المنتج",
          description: "حدث خطأ أثناء تحديث المنتج",
          variant: "destructive",
        });
        return false;
      }

      // Transform back to frontend format
      const transformedProduct = {
        id: data.id,
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        originalPrice: data.original_price ? parseFloat(data.original_price) : undefined,
        category: data.category,
        image: data.image,
        images: data.images || [data.image],
        stock: data.stock,
        sku: data.sku,
        weight: data.weight ? parseFloat(data.weight) : undefined,
        isNew: data.is_new,
        isFeatured: data.is_featured,
        isOnSale: data.is_on_sale,
        features: data.features || [],
        specifications: data.specifications || {},
        rating: data.rating ? parseFloat(data.rating) : 4.5,
        reviews: data.reviews || 0,
        reviewCount: data.review_count || 0,
        dimensions: data.dimensions || { length: 20, width: 15, height: 5 }
      };

      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? transformedProduct : p));
      toast({
        title: "تم تحديث المنتج",
        description: "تم تحديث المنتج بنجاح",
      });
      return true;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "خطأ في الاتصال",
        description: "تعذر الاتصال بقاعدة البيانات",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        console.error('Error deleting product:', error);
        toast({
          title: "خطأ في حذف المنتج",
          description: "حدث خطأ أثناء حذف المنتج",
          variant: "destructive",
        });
        return false;
      }

      setProducts(prev => prev.filter(p => p.id !== productId));
      toast({
        title: "تم حذف المنتج",
        description: "تم حذف المنتج بنجاح",
      });
      return true;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "خطأ في الاتصال",
        description: "تعذر الاتصال بقاعدة البيانات",
        variant: "destructive",
      });
      return false;
    }
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    fetchProducts
  };
};
