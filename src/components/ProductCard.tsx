
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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

  return (
    <Link to={`/products/${id}`}>
      <Card className="product-card hover-lift group animate-scale-in">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {isNew && (
              <Badge className="bg-green-500 hover:bg-green-600">
                جديد
              </Badge>
            )}
            {isOnSale && (
              <Badge className="bg-red-500 hover:bg-red-600">
                تخفيض
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 left-2 p-2 bg-white/80 hover:bg-white shadow-sm"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={`h-4 w-4 ${
                isInWishlist(id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </Button>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handleAddToCart}
              className="w-full btn-primary"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 ml-1" />
              أضف للسلة
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="font-bold text-primary">{price} ج.م</span>
                {originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {originalPrice} ج.م
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <span className="text-xs text-yellow-500">★</span>
                <span className="text-xs text-muted-foreground mr-1">
                  {rating}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
