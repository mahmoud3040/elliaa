import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Minus, Plus, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useProduct, useProducts } from '@/hooks/useWooProducts';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const { data: product, isLoading, error } = useProduct(id || '');
  const { data: allProducts = [] } = useProducts();

  const relatedProducts = product ? allProducts.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-muted-foreground">جاري تحميل المنتج...</p>
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
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">المنتج غير موجود</h1>
            <p className="text-muted-foreground">عذراً، لم نتمكن من العثور على هذا المنتج</p>
            <Link to="/products">
              <Button>العودة للمنتجات</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      });
    }
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "تم نسخ الرابط",
        description: "تم نسخ رابط المنتج إلى الحافظة",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container-rtl">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground mb-8 animate-fade-in">
            <Link to="/" className="hover:text-primary">الرئيسية</Link>
            <ArrowLeft className="h-4 w-4" />
            <Link to="/products" className="hover:text-primary">المنتجات</Link>
            <ArrowLeft className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div className="space-y-4 animate-scale-in">
              <div className="relative overflow-hidden rounded-lg border">
                <img
                  src={product.images[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
                {product.isNew && (
                  <Badge className="absolute top-4 right-4 bg-green-500">
                    جديد
                  </Badge>
                )}
                {product.isOnSale && (
                  <Badge className="absolute top-4 left-4 bg-red-500">
                    تخفيض
                  </Badge>
                )}
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2 space-x-reverse">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded-lg border-2 overflow-hidden ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6 animate-slide-in-left">
              <div className="space-y-4">
                <Badge variant="outline">{product.category}</Badge>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount} تقييم)
                  </span>
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <span className="text-3xl font-bold text-primary">
                    {product.price} ج.م
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {product.originalPrice} ج.م
                    </span>
                  )}
                  {product.originalPrice && (
                    <Badge className="bg-red-500">
                      وفر {product.originalPrice - product.price} ج.م
                    </Badge>
                  )}
                </div>

                <div 
                  className="text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <Separator />

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <span className="font-medium">الكمية:</span>
                  <div className="flex items-center space-x-2 space-x-reverse border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 btn-primary"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 ml-2" />
                    أضف للسلة - {(product.price * quantity).toFixed(0)} ج.م
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleToggleWishlist}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                  </Button>
                  
                  <Button variant="outline" size="lg" onClick={handleShare}>
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 space-x-reverse text-sm">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>شحن مجاني فوق 100 ج.م</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse text-sm">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>ضمان الجودة</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse text-sm">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span>استبدال خلال 7 أيام</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mb-16 animate-fade-in">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">الوصف</TabsTrigger>
                <TabsTrigger value="specifications">المواصفات</TabsTrigger>
                <TabsTrigger value="reviews">التقييمات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">وصف المنتج</h3>
                      <div 
                        className="text-muted-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />
                      {product.features.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium">المميزات:</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {product.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">المواصفات التقنية</h3>
                      {product.specifications && Object.keys(product.specifications).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-2 border-b">
                              <span className="font-medium">{key}:</span>
                              <span className="text-muted-foreground">{value}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">لا توجد مواصفات متاحة لهذا المنتج</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">تقييمات العملاء</h3>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < Math.floor(product.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">{product.rating}/5</span>
                          <span className="text-muted-foreground">({product.reviewCount} تقييم)</span>
                        </div>
                      </div>
                      
                      <div className="text-center py-8 text-muted-foreground">
                        <p>التقييمات متاحة في لوحة تحكم ووردبرس</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">منتجات ذات صلة</h2>
                <Link to={`/products?category=${product.category}`}>
                  <Button variant="outline">
                    عرض المزيد
                    <ArrowLeft className="h-4 w-4 mr-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <div
                    key={relatedProduct.id}
                    className="animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard {...relatedProduct} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
