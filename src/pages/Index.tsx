
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';

const Index = () => {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-gold-50 py-16 md:py-24">
          <div className="container-rtl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-slide-in-left">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    <span className="text-gradient">متجر إيلياء</span>
                    <br />
                    <span className="text-foreground">للأدوات المكتبية</span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-lg">
                    اكتشف مجموعة واسعة من الأدوات المكتبية والقرطاسية عالية الجودة بأفضل الأسعار
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
                    <Button variant="outline" size="lg">
                      من نحن
                      <ArrowLeft className="h-5 w-5 mr-2" />
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center space-x-8 space-x-reverse pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">منتج</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1000+</div>
                    <div className="text-sm text-muted-foreground">عميل سعيد</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">4.9</div>
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
                    className="rounded-lg shadow-2xl"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-primary/20 to-gold-200 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-tr from-gold-200/30 to-primary/10 rounded-full blur-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-background">
          <div className="container-rtl">
            <div className="text-center space-y-4 mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold">تسوق حسب الفئة</h2>
              <p className="text-muted-foreground">اختر من بين فئات متنوعة من المنتجات</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="hover-lift text-center p-6 bg-gradient-to-br from-background to-muted/50">
                    <CardContent className="p-0 space-y-4">
                      <div className="text-4xl">{category.icon}</div>
                      <h3 className="font-semibold">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-muted/30">
          <div className="container-rtl">
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-2 animate-slide-in-left">
                <h2 className="text-3xl font-bold">المنتجات المميزة</h2>
                <p className="text-muted-foreground">أحدث وأفضل منتجاتنا</p>
              </div>
              <Link to="/products">
                <Button variant="outline" className="animate-fade-in">
                  عرض الكل
                  <ArrowLeft className="h-4 w-4 mr-2" />
                </Button>
              </Link>
            </div>

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
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container-rtl">
            <div className="text-center space-y-4 mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold">لماذا تختار متجر إيلياء؟</h2>
              <p className="text-muted-foreground">نوفر لك أفضل تجربة تسوق</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4 animate-scale-in">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-gold-500 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">شحن سريع</h3>
                <p className="text-muted-foreground">
                  توصيل سريع لجميع المحافظات خلال 1-3 أيام عمل
                </p>
              </div>

              <div className="text-center space-y-4 animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-gold-500 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">ضمان الجودة</h3>
                <p className="text-muted-foreground">
                  جميع منتجاتنا مضمونة الجودة مع إمكانية الاستبدال
                </p>
              </div>

              <div className="text-center space-y-4 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-gold-500 rounded-full flex items-center justify-center mx-auto">
                  <Headphones className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">دعم فني 24/7</h3>
                <p className="text-muted-foreground">
                  فريق خدمة العملاء متاح لمساعدتك في أي وقت
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-gold-500">
          <div className="container-rtl text-center">
            <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">
                ابدأ التسوق الآن واحصل على خصم 15%
              </h2>
              <p className="text-primary-foreground/90 text-lg">
                على طلبك الأول عند التسوق بأكثر من 200 جنيه
              </p>
              <Link to="/products">
                <Button size="lg" variant="secondary" className="btn-secondary">
                  تسوق الآن وادخر
                  <ShoppingCart className="h-5 w-5 mr-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
