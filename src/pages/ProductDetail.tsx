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
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Zoom, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import 'swiper/css/thumbs';

// Add custom styles for Swiper navigation
const swiperStyles = `
  .swiper-button-next,
  .swiper-button-prev {
    width: 48px !important;
    height: 48px !important;
    background: rgba(139, 92, 246, 0.12) !important; /* لافندر شفاف */
    border-radius: 50% !important;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.10) !important;
    transition: all 0.3s cubic-bezier(.4,2,.3,1) !important;
    display: flex !important;
    align-items: center;
    justify-content: center;
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 22px !important;
    color: #8B5CF6 !important;
    font-weight: bold !important;
    transition: color 0.3s;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background: #8B5CF6 !important;
    box-shadow: 0 4px 16px #8B5CF6aa !important;
    transform: scale(1.15) rotate(8deg) !important;
  }

  .swiper-button-next:hover:after,
  .swiper-button-prev:hover:after {
    color: #fff !important;
  }

  .swiper-button-disabled {
    opacity: 0.4 !important;
    cursor: not-allowed !important;
  }

  .swiper-button-next {
    right: 10px !important;
  }

  .swiper-button-prev {
    left: 10px !important;
  }

  .thumbs-swiper {
    margin-top: 1rem !important;
  }

  .thumbs-swiper .swiper-slide {
    width: auto !important;
    flex-shrink: 0 !important;
  }
`;

const ProductDetail = () => {
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
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainImageFade, setMainImageFade] = useState(false);

  const relatedProducts = product ? allProducts.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4) : [];

  // دالة لتحويل اسم اللون إلى قيمة CSS صالحة
  const getColorValue = (color: string) => {
    if (!color) return 'gray';
    const colors: Record<string, string> = {
      'أحمر': 'red',
      'أزرق': '#3011ab',
      'أخضر': '#167306',
      'أسود': 'black',
      'أبيض': 'white',
      'أصفر': 'yellow',
      'برتقالي': 'orange',
      'بنفسجي': 'purple',
      'وردي': 'pink',
      'بينك': '#c817cf',
      'لافندر': '#6a1b9a',
      'رمادي': 'gray',
      'بني': 'brown',
      'سماوي': 'skyblue',
      'فضي': 'silver',
      'ذهبي': 'gold',
      // الإنجليزية
      'red': 'red',
      'blue': '#3011ab',
      'green': '#167306',
      'black': 'black',
      'white': 'white',
      'yellow': 'yellow',
      'orange': 'orange',
      'purple': 'purple',
      'pink': '#c817cf',
      'lavender': '#6a1b9a',
      'gray': 'gray',
      'brown': 'brown',
      'skyblue': 'skyblue',
      'silver': 'silver',
      'gold': 'gold',
    };
    if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(color) || color.startsWith('rgb') || color.startsWith('hsl')) {
      return color;
    }
    return colors[color.trim()] || 'gray';
  };

  // دالة لتحويل اسم اللون العربي إلى slug بالإنجليزي
  const getColorSlug = (arabicColor: string): string => {
    const colorMap: Record<string, string> = {
      'أخضر': 'green',
      'أزرق': 'blue',
      'بينك': 'pink',
      'لافندر': 'lavender',
      // يمكن إضافة المزيد من الألوان حسب الحاجة
    };
    return colorMap[arabicColor] || arabicColor.toLowerCase();
  };

  // Auto-hide dialog after 2.5 seconds with smooth animation
  const showAlert = () => {
    setShowColorAlert(true);
    setTimeout(() => {
      setShowColorAlert(false);
    }, 2500);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

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
    const itemToAdd = {
      id: selectedVariation ? selectedVariation.id : product.id,
      name: product.name,
      price: selectedVariation ? 
        parseFloat(selectedVariation.sale_price || selectedVariation.regular_price) : 
        product.price,
      image: selectedVariation?.image?.src || product.image,
      category: product.category,
      variation_id: selectedVariation?.id,
      attributes: selectedVariation ? [
        {
          name: 'color',
          value: getColorSlug(selectedVariation.attributes.find(attr => 
            attr.name.toLowerCase() === 'color' || attr.name === 'اللون'
          )?.option || '')
        }
      ] : []
    };

    for (let i = 0; i < quantity; i++) {
      addToCart(itemToAdd);
    }

    // إظهار رسالة نجاح
    toast({
      title: "تم الإضافة للسلة",
      description: `تم إضافة ${product.name} ${selectedVariation ? `(${selectedVariation.attributes.find(attr => attr.name.toLowerCase() === 'color' || attr.name === 'اللون')?.option})` : ''} للسلة`,
      variant: "default",
      duration: 2000,
    });
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
      
      {/* Color Selection Alert Dialog */}
      <Dialog open={showColorAlert} onOpenChange={setShowColorAlert}>
        <DialogContent className={cn(
          "sm:max-w-md border-0 shadow-2xl bg-background rounded-2xl overflow-hidden",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          "data-[state=open]:slide-in-from-bottom-1/2 data-[state=closed]:slide-out-to-bottom-1/2",
          "data-[state=open]:scale-100 data-[state=closed]:scale-95",
          "duration-500 ease-in-out"
        )}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background rounded-2xl" />
          <div className="relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 p-3 bg-primary/10 rounded-full border border-primary/20">
              <Palette className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <DialogHeader className="pt-4">
              <DialogTitle className="text-2xl font-bold text-center text-primary">
                اختيار اللون
              </DialogTitle>
              <DialogDescription className="text-lg text-center mt-4 space-y-2">
                <p className="text-muted-foreground">
                  من فضلك اختر اللون المناسب للمنتج
                </p>
                <div className="flex justify-center gap-2 mt-3 mb-2">
                  {variations.slice(0, 3).map((variation) => {
                    const colorAttr = variation.attributes.find(attr => 
                      attr.name.toLowerCase() === 'color' || attr.name === 'اللون'
                    );
                    if (colorAttr) {
                      return (
                        <div
                          key={variation.id}
                          className="w-8 h-8 rounded-full border-2 border-white/20 shadow-lg animate-bounce"
                          style={{ 
                            background: getColorValue(colorAttr.option),
                            animationDelay: `${Math.random() * 0.5}s`,
                            animationDuration: '2s'
                          }}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </DialogDescription>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>

      <main className="flex-1 pt-24 bg-background">
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
                <Swiper
                  navigation
                  zoom
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[Navigation, Zoom, Thumbs]}
                  className="rounded-xl overflow-hidden"
                >
                  {product.images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <div className={`swiper-zoom-container flex items-center justify-center w-full h-full transition-all duration-300 ${mainImageFade ? 'opacity-0' : 'opacity-100'}`} style={{ minHeight: 300, maxHeight: 400 }}>
                        <img
                          src={img}
                          alt={product.name}
                          className="w-full h-full object-contain"
                          style={{ maxHeight: 400 }}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
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
              {/* صور مصغرة */}
              <div className="mt-4 grid grid-cols-4 md:grid-cols-6 gap-2">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === idx ? 'border-[#8B5CF6]' : 'border-transparent'
                    }`}
                    onClick={() => {
                      setMainImageFade(true);
                      setTimeout(() => {
                        setSelectedImage(idx);
                        setMainImageFade(false);
                      }, 150);
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - صورة ${idx + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
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
                    {selectedVariation?.sale_price || selectedVariation?.regular_price || product.price} ج.م
                  </span>
                  {selectedVariation?.sale_price && (
                    <span className="text-xl text-muted-foreground line-through">
                      {selectedVariation?.regular_price} ج.م
                    </span>
                  )}
                  {selectedVariation?.sale_price && (
                    <Badge className="bg-red-500">
                      وفر {parseFloat(selectedVariation.regular_price) - parseFloat(selectedVariation.sale_price)} ج.م
                    </Badge>
                  )}
                  {!selectedVariation && product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {product.originalPrice} ج.م
                    </span>
                  )}
                  {!selectedVariation && product.originalPrice && (
                    <Badge className="bg-red-500">
                      وفر {product.originalPrice - product.price} ج.م
                    </Badge>
                  )}
                </div>

                {/* خيارات المنتج المتغيرة (variables) */}
                {variations.length > 0 && (
                  <div className="py-4">
                    <div className="font-medium mb-3">اللون :</div>
                    <div className="flex flex-wrap gap-3">
                      {variations.map((variation) => {
                        const colorAttr = variation.attributes.find(attr => attr.name.toLowerCase() === 'color' || attr.name === 'اللون');
                        if (colorAttr) {
                          return (
                            <button
                              key={variation.id}
                              onClick={() => setSelectedVariation(variation)}
                              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${selectedVariation?.id === variation.id ? 'border-primary scale-110 shadow-lg' : 'border-gray-300'}`}
                              style={{ background: getColorValue(colorAttr.option) }}
                              title={colorAttr.option}
                            />
                          );
                        } else {
                          const textAttr = variation.attributes[0];
                          return (
                            <button
                              key={variation.id}
                              onClick={() => setSelectedVariation(variation)}
                              className={`px-4 py-1 rounded border text-sm font-medium transition-all duration-150 ${selectedVariation?.id === variation.id ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white'}`}
                              style={{ minWidth: 40 }}
                            >
                              {textAttr?.option || 'اختيار'}
                            </button>
                          );
                        }
                      })}
                    </div>
                  </div>
                )}

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
                    onClick={() => {
                      if (variations.length > 0 && !selectedVariation) {
                        showAlert();
                        return;
                      }
                      handleAddToCart();
                    }}
                    className={`flex-1 btn-primary ${variations.length > 0 && !selectedVariation ? 'opacity-90 hover:opacity-100' : ''}`}
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 ml-2" />
                    أضف للسلة - {(selectedVariation ? parseFloat(selectedVariation.sale_price || selectedVariation.regular_price) : product.price) * quantity} ج.م
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
                    <ProductCard
                      id={relatedProduct.id}
                      name={relatedProduct.name}
                      price={relatedProduct.price}
                      originalPrice={relatedProduct.originalPrice}
                      image={relatedProduct.image}
                      images={relatedProduct.images}
                      category={relatedProduct.category}
                      rating={relatedProduct.rating}
                      isNew={relatedProduct.isNew}
                      isOnSale={relatedProduct.isOnSale}
                      type={relatedProduct.type}
                      attributes={relatedProduct.attributes}
                    />
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
