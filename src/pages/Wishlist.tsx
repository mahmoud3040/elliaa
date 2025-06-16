import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-lavender-50 to-purple-50">
      <Header />
      
      <main className="flex-1 pt-24">
        <div className="container-rtl">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gradient mb-2">قائمة المفضلة</h1>
            <p className="text-muted-foreground">
              المنتجات التي أضفتها إلى قائمة المفضلة
            </p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16 animate-scale-in">
              <Card className="max-w-md mx-auto glass-effect">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">قائمة المفضلة فارغة</h3>
                  <p className="text-muted-foreground mb-6">
                    لم تقم بإضافة أي منتجات إلى قائمة المفضلة بعد
                  </p>
                  <Link to="/products">
                    <Button className="btn-primary">
                      تصفح المنتجات
                      <ArrowRight className="h-4 w-4 mr-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header Actions */}
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">
                  {items.length} منتج في قائمة المفضلة
                </p>
                <Button 
                  variant="outline" 
                  onClick={clearWishlist}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 ml-2" />
                  إفراغ القائمة
                </Button>
              </div>

              {/* Wishlist Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item, index) => (
                  <Card 
                    key={item.id} 
                    className="product-card animate-scale-in hover-lift"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-t-xl"
                        loading="lazy"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 left-2 bg-white/90 hover:bg-white shadow-sm text-destructive hover:text-destructive"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <Link to={`/products/${item.id}`}>
                          <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary text-lg">
                            {item.price} ج.م
                          </span>
                          {item.category && (
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                              {item.category}
                            </span>
                          )}
                        </div>
                        
                        <Button
                          onClick={() => handleAddToCart(item)}
                          className="w-full btn-primary"
                          size="sm"
                        >
                          <ShoppingCart className="h-4 w-4 ml-1" />
                          أضف للسلة
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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

export default Wishlist;
