
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, X, Sun, Moon, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useTheme } from '@/components/ThemeProvider';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: 'الرئيسية', href: '/' },
    { name: 'المنتجات', href: '/products' },
    { name: 'من نحن', href: '/about' },
    { name: 'تواصل معنا', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
      <div className="container-rtl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse group">
            <div className="w-10 h-10 lavender-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white font-bold text-lg">إ</span>
            </div>
            <span className="text-xl font-bold text-gradient">متجر إيلياء</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="ابحث عن المنتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 bg-background/80 border-border/50 focus:border-primary/50 rounded-xl"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden md:flex hover:bg-accent/80 rounded-xl"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Wishlist */}
            <Link to="/wishlist">
              <Button variant="ghost" size="sm" className="relative hover:bg-accent/80 rounded-xl">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-primary to-purple-600">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative hover:bg-accent/80 rounded-xl">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-primary to-purple-600 animate-pulse-glow">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Account */}
            <Button variant="ghost" size="sm" className="hover:bg-accent/80 rounded-xl">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:bg-accent/80 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-md animate-fade-in">
            <div className="p-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="ابحث عن المنتجات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 bg-background/80 border-border/50 rounded-xl"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-foreground hover:text-primary transition-colors font-medium py-2 px-3 rounded-xl hover:bg-accent/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full justify-start rounded-xl"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4 ml-2" />
                    الوضع النهاري
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 ml-2" />
                    الوضع الليلي
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
