import { useLocation, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Package, Truck, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lottie from 'lottie-react';
import successAnim from '@/assets/success.json';
import errorAnim from '@/assets/error.json';
import { wooCommerce } from '@/lib/woocommerce';
import { useCart } from '@/contexts/CartContext';
import { getShippingCost } from '@/globalOverrides';

const OrderReceived = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState(false);
  const { clearCart } = useCart();
  // استخراج status من الكويري سترينج
  const status = new URLSearchParams(location.search).get('status');

  useEffect(() => {
    async function fetchOrder() {
      try {
        if (orderId) {
          const data = await wooCommerce.getOrder(Number(orderId));
          setOrder(data);
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      }
    }
    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    // إذا كانت حالة الطلب ناجحة، امسح السلة
    if (status === 'processing' || status === 'completed') {
      clearCart();
    }
  }, [status, clearCart]);

  if (error) {
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
                <XCircle className="w-8 h-8" /> لم يتم العثور على الطلب
              </h1>
              <p className="text-muted-foreground">تأكد من رقم الطلب أو تواصل مع الدعم.</p>
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

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Lottie animationData={successAnim} loop />
            <p className="mt-4 text-lg font-bold">جاري تحميل تفاصيل الطلب...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // رسالة حسب حالة الدفع
  let statusMessage = null;
  let statusIcon = null;
  let statusAnim = null;
  if (status === 'processing' || status === 'completed') {
    statusMessage = 'تم الدفع بنجاح!';
    statusIcon = <CheckCircle className="w-8 h-8 text-green-600" />;
    statusAnim = <Lottie animationData={successAnim} loop={false} />;
  } else if (status === 'failed') {
    statusMessage = 'فشل الدفع أو تم إلغاؤه';
    statusIcon = <XCircle className="w-8 h-8 text-red-600" />;
    statusAnim = <Lottie animationData={errorAnim} loop={false} />;
  }

  // بعد جلب بيانات الشحن:
  const governorate = order.shipping?.state || 'القاهرة';
  const shipping = getShippingCost(governorate);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container-rtl">
          <div className="text-center space-y-6 max-w-md mx-auto animate-fade-in">
            <div className="w-24 h-24 mx-auto">{statusAnim}</div>
            <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
              {statusIcon} {statusMessage || 'تم استلام الطلب'}
            </h1>
            <p className="text-lg text-muted-foreground">
              شكراً لك! رقم طلبك هو <span className="font-bold">#{order.id}</span>
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>حالة الطلب:</strong> {order.status === 'processing' ? 'جاري التنفيذ' : order.status}
              </p>
              <p className="text-sm text-green-700 mt-1">
                احتفظ بهذا الرقم للمتابعة أو الاستفسار
              </p>
            </div>
          </div>
          <div className="max-w-2xl mx-auto space-y-8 mt-8">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 ml-2" />
                  تفاصيل الطلب
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {order.line_items?.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex space-x-3 space-x-reverse">
                        {/* لا يوجد صورة مباشرة في WooCommerce API الافتراضي */}
                        <div>
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">الكمية: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-medium">{item.total} ج.م</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع الكلي</span>
                  <span className="text-primary">{order.total} ج.م</span>
                </div>
              </CardContent>
            </Card>
            <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 ml-2" />
                  بيانات الشحن
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium">الاسم:</span> {order.shipping?.first_name} {order.shipping?.last_name}
                </div>
                <div>
                  <span className="font-medium">الهاتف:</span> {order.billing?.phone}
                </div>
                {order.billing?.email && (
                  <div>
                    <span className="font-medium">البريد الإلكتروني:</span> {order.billing.email}
                  </div>
                )}
                <div>
                  <span className="font-medium">العنوان:</span> {order.shipping?.address_1}, {order.shipping?.city}, {order.shipping?.state}
                </div>
                <div>
                  <span className="font-medium">طريقة الدفع:</span> {order.payment_method_title}
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="products">
                <Button size="lg" className="btn-primary">متابعة التسوق</Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">العودة للرئيسية</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderReceived;
