
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
      console.log('Fetching products from Supabase...');
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Raw data from Supabase:', data);

      // Transform database format to frontend format
      const transformedProducts = data?.map(item => {
        console.log('Transforming item:', item);
        return {
          id: item.id,
          name: item.name || '',
          description: item.description || '',
          price: parseFloat(item.price) || 0,
          originalPrice: item.original_price ? parseFloat(item.original_price) : undefined,
          category: item.category || '',
          image: item.image || '',
          images: item.images || [item.image || ''],
          stock: item.stock || 0,
          sku: item.sku || '',
          weight: item.weight ? parseFloat(item.weight) : 0,
          isNew: Boolean(item.is_new),
          isFeatured: Boolean(item.is_featured),
          isOnSale: Boolean(item.is_on_sale),
          features: item.features || [],
          specifications: item.specifications || {},
          rating: item.rating ? parseFloat(item.rating) : 4.5,
          reviews: item.reviews || 0,
          reviewCount: item.review_count || 0,
          dimensions: item.dimensions || { length: 20, width: 15, height: 5 }
        };
      }) || [];

      console.log('Transformed products:', transformedProducts);
      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "خطأ في جلب المنتجات",
        description: "حدث خطأ أثناء جلب المنتجات من قاعدة البيانات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Product) => {
    try {
      console.log('Adding product:', product);
      
      // Transform frontend format to database format
      const dbProduct = {
        name: product.name,
        description: product.description,
        price: product.price,
        original_price: product.originalPrice || null,
        category: product.category,
        image: product.image,
        images: product.images || [product.image],
        stock: product.stock,
        sku: product.sku || null,
        weight: product.weight || null,
        is_new: product.isNew || false,
        is_featured: product.isFeatured || false,
        is_on_sale: product.isOnSale || false,
        features: product.features || [],
        specifications: product.specifications || {},
        rating: product.rating || 4.5,
        reviews: product.reviews || 0,
        review_count: product.reviewCount || 0,
        dimensions: product.dimensions || { length: 20, width: 15, height: 5 }
      };

      console.log('Sending to database:', dbProduct);

      const { data, error } = await supabase
        .from('products')
        .insert([dbProduct])
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      console.log('Product added successfully:', data);

      // Refresh products list
      await fetchProducts();
      
      toast({
        title: "تم إضافة المنتج",
        description: "تم إضافة المنتج بنجاح",
      });
      return true;
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "خطأ في إضافة المنتج",
        description: "حدث خطأ أثناء إضافة المنتج",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      console.log('Updating product:', updatedProduct);
      
      // Transform frontend format to database format
      const dbProduct = {
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        original_price: updatedProduct.originalPrice || null,
        category: updatedProduct.category,
        image: updatedProduct.image,
        images: updatedProduct.images || [updatedProduct.image],
        stock: updatedProduct.stock,
        sku: updatedProduct.sku || null,
        weight: updatedProduct.weight || null,
        is_new: updatedProduct.isNew || false,
        is_featured: updatedProduct.isFeatured || false,
        is_on_sale: updatedProduct.isOnSale || false,
        features: updatedProduct.features || [],
        specifications: updatedProduct.specifications || {},
        rating: updatedProduct.rating || 4.5,
        reviews: updatedProduct.reviews || 0,
        review_count: updatedProduct.reviewCount || 0,
        dimensions: updatedProduct.dimensions || { length: 20, width: 15, height: 5 },
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('products')
        .update(dbProduct)
        .eq('id', updatedProduct.id);

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      // Refresh products list
      await fetchProducts();
      
      toast({
        title: "تم تحديث المنتج",
        description: "تم تحديث المنتج بنجاح",
      });
      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "خطأ في تحديث المنتج",
        description: "حدث خطأ أثناء تحديث المنتج",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      console.log('Deleting product:', productId);
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      // Refresh products list
      await fetchProducts();
      
      toast({
        title: "تم حذف المنتج",
        description: "تم حذف المنتج بنجاح",
      });
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "خطأ في حذف المنتج",
        description: "حدث خطأ أثناء حذف المنتج",
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
