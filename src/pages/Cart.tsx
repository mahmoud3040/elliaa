import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 25;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 py-16">
          <div className="container-rtl">
            <div className="text-center space-y-6 max-w-md mx-auto animate-fade-in">
              <div className="text-6xl mb-4">🛒</div>
              <h1 className="text-2xl font-bold">سلة التسوق فارغة</h1>
              <p className="text-muted-foreground">
                لم تقم بإضافة أي منتجات إلى سلة التسوق بعد
              </p>
              <Link to="/products">
                <Button size="lg" className="btn-primary">
                  تصفح المنتجات
                  <ShoppingBag className="h-5 w-5 mr-2" />
                </Button>
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
      
      <main className="flex-1 py-8">
        <div className="container-rtl">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold">سلة التسوق</h1>
              <p className="text-muted-foreground">{items.length} منتج في السلة</p>
            </div>
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 ml-2" />
              إفراغ السلة
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <Card key={item.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            {item.category && (
                              <Badge variant="outline" className="mt-1">
                                {item.category}
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 space-x-reverse border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4 py-2 font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="text-left">
                            <div className="font-bold text-primary">
                              {(item.price * item.quantity).toFixed(0)} ج.م
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {item.price} ج.م للقطعة
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 animate-slide-in-left">
                <CardHeader>
                  <CardTitle>ملخص الطلب</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي</span>
                    <span>{subtotal.toFixed(0)} ج.م</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>الشحن</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>
                      {shipping === 0 ? 'مجاني' : `${shipping} ج.م`}
                    </span>
                  </div>
                  
                  {subtotal < 100 && (
                    <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      أضف {(100 - subtotal).toFixed(0)} ج.م أخرى للحصول على شحن مجاني
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>المجموع</span>
                    <span className="text-primary">{total.toFixed(0)} ج.م</span>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-3">
                  <Link to="/checkout" className="w-full">
                    <Button size="lg" className="w-full btn-primary">
                      متابعة للدفع
                      <ArrowLeft className="h-5 w-5 mr-2" />
                    </Button>
                  </Link>
                  
                  <Link to="products" className="w-full">
                    <Button variant="outline" size="lg" className="w-full">
                      متابعة التسوق
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
