
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

      setProducts(data || []);
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
      const { data, error } = await supabase
        .from('products')
        .insert([{
          ...product,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
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

      setProducts(prev => [data, ...prev]);
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
      const { data, error } = await supabase
        .from('products')
        .update({
          ...updatedProduct,
          updated_at: new Date().toISOString()
        })
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

      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? data : p));
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
