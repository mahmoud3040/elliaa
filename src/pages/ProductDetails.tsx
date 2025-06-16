import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Minus, Plus, Share2, Truck, Shield, RotateCcw, AlertCircle, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useProduct, useProducts, useProductVariations } from '@/hooks/useWooProducts';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showColorAlert, setShowColorAlert] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const { data: product, isLoading, error } = useProduct(id || '');
  const { data: allProducts = [] } = useProducts();
  const { data: variations = [] } = useProductVariations(id || '');
  const [selectedVariation, setSelectedVariation] = useState(null);

  useEffect(() => {
    // Add a small delay to ensure the page is fully loaded
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 100);
  }, [id]);

  const relatedProducts = product ? allProducts.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-32 bg-background">
          <div className="container-rtl">
            <div className="text-center space-y-4">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="text-muted-foreground">جاري تحميل المنتج...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 bg-background">
          <div className="container-rtl">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold">المنتج غير موجود</h1>
              <p className="text-muted-foreground">عذراً، لم نتمكن من العثور على هذا المنتج</p>
              <Link to="/products">
                <Button>العودة للمنتجات</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-32 bg-background">
        <div className="container-rtl">
          {/* Product content will go here */}
          <h1>{product.name}</h1>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;