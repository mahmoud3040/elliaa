import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useCreateOrder } from '@/hooks/useWooOrders';
import { wooCommerce } from '@/lib/woocommerce';
import { getShippingCost } from '@/globalOverrides';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const createOrderMutation = useCreateOrder();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    governorate: '',
    postalCode: '',
  });
  const [paymentGateways, setPaymentGateways] = useState<any[]>([]);
  const [shippingMethods, setShippingMethods] = useState<any[]>([]);
  const [settings, setSettings] = useState<any[]>([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>("");

  const subtotal = getTotalPrice();
  const governorate = shippingData.governorate || '';
  let shipping = 0;
  let shippingText = 'سيتم تحديد تكلفة الشحن حسب المحافظة';
  if (subtotal >= 500) {
    shipping = 0;
    shippingText = 'مجاني';
  } else if (governorate) {
    shipping = getShippingCost(governorate);
    shippingText = `${shipping} ج.م`;
  }
  const total = subtotal + shipping;

  const governorates = [
    'القاهرة', 'الجيزة', 'الأسكندرية', 'الدقهلية', 'البحر الأحمر', 'البحيرة',
    'الفيوم', 'الغربية', 'الإسماعيلية', 'المنوفية', 'المنيا', 'القليوبية',
    'الوادي الجديد', 'السويس', 'اسوان', 'اسيوط', 'بني سويف', 'بورسعيد',
    'دمياط', 'الشرقية', 'جنوب سيناء', 'كفر الشيخ', 'مطروح', 'الأقصر',
    'قنا', 'شمال سيناء', 'سوهاج'
  ];

  useEffect(() => {
    async function fetchWooData() {
      try {
        const [gateways, shipping, settings] = await Promise.all([
          wooCommerce.getPaymentGateways(),
          wooCommerce.getShippingMethods(),
          wooCommerce.getSettings()
        ]);
        setPaymentGateways(gateways);
        console.log('WooCommerce Payment Gateways:', gateways); // تحقق من ظهور جميع بوابات الدفع
        setShippingMethods(shipping);
        setSettings(settings);
        // تعيين أول طريقة شحن كافتراضية
        if (shipping && shipping.length > 0) {
          setSelectedShippingMethod(shipping[0].id);
        }
      } catch (e) {
        // يمكن عرض رسالة خطأ هنا إذا أردت
      }
    }
    fetchWooData();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setShippingData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'phone', 'address', 'city', 'governorate'];
    const missingFields = requiredFields.filter(field => !shippingData[field as keyof typeof shippingData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    try {
      const orderData = {
        ...shippingData,
        paymentMethod,
        items,
        total,
        shipping,
      };

      const result = await createOrderMutation.mutateAsync(orderData);
      // جلب بيانات الطلب كاملة من WooCommerce
      let orderDetails = null;
      try {
        orderDetails = await import('@/lib/woocommerce').then(m => m.wooCommerce.getOrder(result.id));
      } catch (e) {
        orderDetails = null;
      }
      // إذا كانت طريقة الدفع كاشير أو أي بوابة تحتاج redirect
      const kashierGateways = ['kashier_card', 'kashier_wallet', 'kashier_bank_installments', 'kashier_valu', 'kashier_souhoola', 'kashier_aman'];
      if (kashierGateways.includes(paymentMethod)) {
        // استخدم order_key من orderDetails فقط
        const orderKey = orderDetails && orderDetails.order_key;
        if (orderKey) {
          window.location.href = `https://wp.elliaa.com/checkout/order-pay/${result.id}/?key=${orderKey}`;
          return;
        }
      }
      // Clear cart and redirect to order-received page مع تمرير رقم الطلب في الرابط
      clearCart();
      navigate(`/order-received/${result.id}`, {
        state: {
          orderData: {
            ...orderData,
            orderId: result.id,
            orderDetails: orderDetails || null,
          }
        }
      });
    } catch (error) {
      console.error('Order submission error:', error);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16">
          <div className="container-rtl">
            <div className="text-center space-y-6 max-w-md mx-auto">
              <h1 className="text-2xl font-bold">لا توجد منتجات للدفع</h1>
              <p className="text-muted-foreground">يرجى إضافة منتجات إلى السلة أولاً</p>
              <Link to="/products">
                <Button>تصفح المنتجات</Button>
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
      
      <main className="flex-1 py-8 mt-16">
        <div className="container-rtl">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold">إتمام الطلب</h1>
            <p className="text-muted-foreground">أكمل بياناتك لإتمام عملية الشراء</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Shipping Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information */}
                <Card className="animate-scale-in">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="h-5 w-5 ml-2" />
                      بيانات الشحن
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">الاسم الأول *</Label>
                        <Input
                          id="firstName"
                          value={shippingData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">الاسم الأخير *</Label>
                        <Input
                          id="lastName"
                          value={shippingData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input
                          id="phone"
                          value={shippingData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="01xxxxxxxxx"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">العنوان التفصيلي *</Label>
                      <Input
                        id="address"
                        value={shippingData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="الشارع، رقم المبنى، الدور..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="governorate">المحافظة *</Label>
                        <Select onValueChange={(value) => handleInputChange('governorate', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر المحافظة" />
                          </SelectTrigger>
                          <SelectContent>
                            {governorates.map((gov) => (
                              <SelectItem key={gov} value={gov}>
                                {gov}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="city">المدينة *</Label>
                        <Input
                          id="city"
                          value={shippingData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">الرقم البريدي</Label>
                        <Input
                          id="postalCode"
                          value={shippingData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method - ديناميكي */}
                <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 ml-2" />
                      طريقة الدفع
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-4">
                        {paymentGateways.filter(g => g.enabled).map((gateway) => (
                          <div key={gateway.id} className="flex items-center space-x-3 space-x-reverse p-4 border rounded-lg">
                            <RadioGroupItem value={gateway.id} id={gateway.id} />
                            <Label htmlFor={gateway.id} className="flex-1 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium">{gateway.method_title || gateway.title}</div>
                                  
                                </div>
                                <div className="text-2xl">{gateway.id.includes('kashier') ? '💳' : '💵'}</div>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Shipping Methods - ديناميكي */}
                <Card className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="h-5 w-5 ml-2" />
                      طريقة الشحن
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedShippingMethod} onValueChange={setSelectedShippingMethod}>
                      <div className="space-y-4">
                        {shippingMethods.filter(m => m.enabled).map((method) => (
                          <div key={method.id} className="flex items-center space-x-3 space-x-reverse p-4 border rounded-lg">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium">{method.title}</div>
                                  <div className="text-sm text-muted-foreground">{method.description}</div>
                                </div>
                                <div className="text-2xl">🚚</div>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 animate-slide-in-left">
                  <CardHeader>
                    <CardTitle>ملخص الطلب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>{(item.price * item.quantity).toFixed(0)} ج.م</span>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>المجموع الفرعي</span>
                      <span>{subtotal.toFixed(0)} ج.م</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الشحن</span>
                      <span
                        className={`
                          text-sm md:text-base font-medium block
                          text-[#8B5CF6]
                          text-end md:text-center whitespace-pre-line
                        `}
                      >
                        {shippingText}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>المجموع</span>
                      <span className="text-primary">{total.toFixed(0)} ج.م</span>
                    </div>
                    
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full btn-primary"
                      disabled={createOrderMutation.isPending}
                    >
                      {createOrderMutation.isPending ? 'جاري الإرسال...' : 'تأكيد الطلب'}
                      {!createOrderMutation.isPending && <ArrowLeft className="h-5 w-5 mr-2" />}
                    </Button>
                    <Link to="/cart" className="block">
                      <Button variant="outline" size="lg" className="w-full">
                        العودة للسلة
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
