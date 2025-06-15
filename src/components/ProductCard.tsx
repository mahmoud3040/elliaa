
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating?: number;
  isNew?: boolean;
  isOnSale?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating = 5,
  isNew = false,
  isOnSale = false,
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price, image, category });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, image, category });
    }
  };

  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card className="product-card hover-lift group animate-scale-in relative overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg">
              جديد
            </Badge>
          )}
          {isOnSale && (
            <Badge className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg">
              {discountPercentage > 0 ? `خصم ${discountPercentage}%` : 'تخفيض'}
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <Button
            variant="secondary"
            size="sm"
            className="p-2 bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm rounded-xl"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isInWishlist(id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </Button>
          
          <Link to={`/products/${id}`}>
            <Button
              variant="secondary"
              size="sm"
              className="p-2 bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm rounded-xl"
            >
              <Eye className="h-4 w-4 text-gray-600" />
            </Button>
          </Link>
        </div>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button
            onClick={handleAddToCart}
            className="w-full btn-primary shadow-lg backdrop-blur-sm"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 ml-1" />
            أضف للسلة
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5">
              {category}
            </Badge>
            <div className="flex items-center space-x-1 space-x-reverse">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-muted-foreground font-medium">
                {rating}
              </span>
            </div>
          </div>
          
          <Link to={`/products/${id}`}>
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors leading-relaxed">
              {name}
            </h3>
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="font-bold text-primary text-lg">
                {price} ج.م
              </span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {originalPrice} ج.م
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
