import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Package, Truck, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lottie from 'lottie-react';
import successAnim from '@/assets/success.json';
import errorAnim from '@/assets/error.json';
import { getShippingCost } from '@/globalOverrides';

const ThankYou = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;
  const orderError = location.state?.orderError;

  if (orderError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16">
          <div className="container-rtl">
            <div className="text-center space-y-6 max-w-md mx-auto animate-fade-in">
              <div className="w-24 h-24 mx-auto">
                <Lottie animationData={errorAnim} loop={false} />
              </div>
              <h1 className="text-2xl font-bold text-red-600 flex items-center justify-center gap-2">
                <XCircle className="w-8 h-8" /> حدث خطأ في الطلب
              </h1>
              <p className="text-muted-foreground">لم يتم تنفيذ الطلب بنجاح. يرجى المحاولة مرة أخرى أو التواصل مع الدعم.</p>
              <Link to="/checkout">
                <Button>إعادة المحاولة</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16">
          <div className="container-rtl">
            <div className="text-center space-y-6 max-w-md mx-auto">
              <h1 className="text-2xl font-bold">صفحة غير صحيحة</h1>
              <p className="text-muted-foreground">لم نتمكن من العثور على بيانات الطلب</p>
              <Link to="/">
                <Button>العودة للرئيسية</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { items, shippingData, paymentMethod, total, orderId, orderDetails } = orderData;

  // إذا توفرت بيانات الطلب من WooCommerce استخدمها
  const realOrderId = orderDetails?.id || orderId;
  const realStatus = orderDetails?.status || 'processing';

  // معالجة مشكلة undefined
  if (!shippingData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16">
          <div className="container-rtl">
            <div className="text-center space-y-6 max-w-md mx-auto animate-fade-in">
              <div className="w-24 h-24 mx-auto">
                <Lottie animationData={errorAnim} loop={false} />
              </div>
              <h1 className="text-2xl font-bold text-red-600 flex items-center justify-center gap-2">
                <XCircle className="w-8 h-8" /> بيانات الشحن غير متوفرة
              </h1>
              <p className="text-muted-foreground">حدث خطأ أثناء معالجة بيانات الشحن. يرجى المحاولة مرة أخرى.</p>
              <Link to="/checkout">
                <Button>إعادة المحاولة</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const governorate = shippingData?.governorate || 'القاهرة';
  const shipping = getShippingCost(governorate);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container-rtl">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Success Message */}
            <div className="text-center space-y-6 animate-fade-in">
              <div className="w-24 h-24 mx-auto">
                <Lottie animationData={successAnim} loop={false} />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-green-600">تم تأكيد طلبك بنجاح!</h1>
                <p className="text-lg text-muted-foreground">
                  شكراً لك! تم استلام طلبك وسيتم معالجته قريباً
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>رقم الطلب:</strong> #{realOrderId}
                </p>
                <p className="text-sm text-green-700 mt-1">
                  حالة الطلب: {realStatus === 'processing' ? 'جاري التنفيذ' : realStatus}
                </p>
                <p className="text-sm text-green-700 mt-1">
                  احتفظ بهذا الرقم للمرجعية المستقبلية
                </p>
              </div>
            </div>

            {/* Order Details */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 ml-2" />
                  تفاصيل الطلب
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex space-x-3 space-x-reverse">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            الكمية: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">
                        {(item.price * item.quantity).toFixed(0)} ج.م
                      </span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع الكلي</span>
                  <span className="text-primary">{total.toFixed(0)} ج.م</span>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 ml-2" />
                  بيانات الشحن
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium">الاسم:</span>{' '}
                  {shippingData.firstName} {shippingData.lastName}
                </div>
                <div>
                  <span className="font-medium">الهاتف:</span>{' '}
                  {shippingData.phone}
                </div>
                {shippingData.email && (
                  <div>
                    <span className="font-medium">البريد الإلكتروني:</span>{' '}
                    {shippingData.email}
                  </div>
                )}
                <div>
                  <span className="font-medium">العنوان:</span>{' '}
                  {shippingData.address}, {shippingData.city}, {shippingData.governorate}
                </div>
                <div>
                  <span className="font-medium">طريقة الدفع:</span>{' '}
                  {paymentMethod === 'cod' ? 'الدفع عند الاستلام' : paymentMethod}
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle>الخطوات التالية</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">تأكيد الطلب</h4>
                      <p className="text-sm text-muted-foreground">
                        سنقوم بمراجعة طلبك وتأكيده خلال ساعات قليلة
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">تحضير الطلب</h4>
                      <p className="text-sm text-muted-foreground">
                        سيتم تحضير طلبك وتجهيزه للشحن خلال 24 ساعة
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">الشحن والتوصيل</h4>
                      <p className="text-sm text-muted-foreground">
                        سيتم شحن طلبك ووصوله خلال 1-3 أيام عمل
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact and Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
              <Card>
                <CardContent className="p-6 text-center space-y-3">
                  <Phone className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">تحتاج مساعدة؟</h3>
                  <p className="text-sm text-muted-foreground">
                    اتصل بنا على 123-456-7890
                  </p>
                  <Button variant="outline" size="sm">
                    اتصل بنا
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center space-y-3">
                  <Package className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">تتبع الطلب</h3>
                  <p className="text-sm text-muted-foreground">
                    سنرسل لك رابط التتبع قريباً
                  </p>
                  <Button variant="outline" size="sm" disabled>
                    تتبع الطلب
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="products">
                <Button size="lg" className="btn-primary">
                  متابعة التسوق
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">
                  العودة للرئيسية
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
