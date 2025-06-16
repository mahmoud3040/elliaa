import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, Headphones, Gift, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FloatingActionButton from '@/components/FloatingActionButton';
import ConfigNotice from '@/components/ConfigNotice';
import { useHomeProducts, useCategories } from '@/hooks/useWooProducts';

const Index = () => {
  const { data: homeProducts = [], isLoading: homeProductsLoading, error: homeProductsError } = useHomeProducts();
  const { data: categories = [] } = useCategories();
  
  // إضافة console logs لتتبع البيانات
  console.log('🏠 Home products data:', homeProducts);
  console.log('⏳ Home products loading:', homeProductsLoading);
  console.log('❌ Home products error:', homeProductsError);
  
  const featuredProducts = homeProducts.slice(0, 6);
  console.log('⭐ Featured products (first 6):', featuredProducts);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-lavender-50 via-background to-purple-50">
      <Header />
      
      <main className="flex-1">
        {/* Config Notice */}
        <div className="container-rtl py-4">
          <ConfigNotice />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 lavender-gradient opacity-10"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/20 to-purple-300/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-tr from-purple-200/30 to-pink-200/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
          
          <div className="container-rtl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-slide-in-left">
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    <span className="text-gradient">متجر إيلياء</span>
                    <br />
                    <span className="text-foreground">للأدوات المكتبية</span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                    اكتشف مجموعة واسعة من الأدوات المكتبية والقرطاسية عالية الجودة بأفضل الأسعار مع تجربة تسوق استثنائية
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/products">
                    <Button size="lg" className="btn-primary group">
                      تسوق الآن
                      <ShoppingCart className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline" size="lg" className="btn-secondary">
                      من نحن
                      <ArrowLeft className="h-5 w-5 mr-2" />
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-8 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient">{homeProducts.length}+</div>
                    <div className="text-sm text-muted-foreground">منتج مميز</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient">1000+</div>
                    <div className="text-sm text-muted-foreground">عميل سعيد</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient">4.9</div>
                    <div className="flex items-center justify-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative animate-fade-in">
                <div className="relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop"
                    alt="أدوات مكتبية"
                    className="rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-500"
                  />
                  <div className="absolute -top-6 -right-6 w-24 h-24 lavender-gradient rounded-2xl flex items-center justify-center shadow-xl animate-float">
                    <Gift className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '0.5s' }}>
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-background relative">
          <div className="container-rtl">
            <div className="text-center space-y-4 mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold text-gradient">تسوق حسب الفئة</h2>
              <p className="text-muted-foreground text-lg">اختر من بين فئات متنوعة من المنتجات عالية الجودة</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="animate-scale-in hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="text-center p-6 glass-effect hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-0 space-y-4">
                      <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gradient-to-br from-muted/30 to-accent/20">
          <div className="container-rtl">
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-2 animate-slide-in-left">
                <h2 className="text-3xl font-bold text-gradient">المنتجات المميزة</h2>
                <p className="text-muted-foreground text-lg">أحدث وأفضل منتجاتنا المختارة خصيصاً لك</p>
              </div>
              <Link to="/products">
                <Button variant="outline" className="btn-secondary animate-fade-in hover-lift">
                  عرض الكل
                  <ArrowLeft className="h-4 w-4 mr-2" />
                </Button>
              </Link>
            </div>

            {homeProductsLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">جاري تحميل المنتجات...</p>
              </div>
            ) : homeProductsError ? (
              <div className="text-center py-12">
                <p className="text-red-500">خطأ في تحميل المنتجات: {homeProductsError.message}</p>
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  لا توجد منتجات في فئة "home". قم بإضافة منتجات إلى فئة "home" في ووردبرس لعرضها هنا
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  تأكد من أن الفئة موجودة وتحتوي على منتجات
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container-rtl">
            <div className="text-center space-y-4 mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold text-gradient">لماذا تختار متجر إيلياء؟</h2>
              <p className="text-muted-foreground text-lg">نوفر لك أفضل تجربة تسوق مع خدمات متميزة</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4 animate-scale-in group">
                <div className="w-20 h-20 lavender-gradient rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Truck className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">شحن سريع</h3>
                <p className="text-muted-foreground leading-relaxed">
                  توصيل سريع لجميع المحافظات خلال 1-3 أيام عمل مع إمكانية التتبع المباشر
                </p>
              </div>

              <div className="text-center space-y-4 animate-scale-in group" style={{ animationDelay: '0.1s' }}>
                <div className="w-20 h-20 lavender-gradient rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">ضمان الجودة</h3>
                <p className="text-muted-foreground leading-relaxed">
                  جميع منتجاتنا مضمونة الجودة مع إمكانية الاستبدال والإرجاع خلال 14 يوم
                </p>
              </div>

              <div className="text-center space-y-4 animate-scale-in group" style={{ animationDelay: '0.2s' }}>
                <div className="w-20 h-20 lavender-gradient rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Headphones className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">دعم فني 24/7</h3>
                <p className="text-muted-foreground leading-relaxed">
                  فريق خدمة العملاء متاح لمساعدتك في أي وقت عبر الهاتف أو الواتساب
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lavender-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10"></div>
          <div className="container-rtl text-center relative z-10">
            <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">
                ابدأ التسوق الآن واحصل على خصم 15%
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                على طلبك الأول عند التسوق بأكثر من 200 جنيه مع شحن مجاني لجميع المحافظات
              </p>
              <Link to="/products">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  تسوق الآن وادخر
                  <ShoppingCart className="h-5 w-5 mr-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
