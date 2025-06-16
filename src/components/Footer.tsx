import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { useMemo } from 'react';

const Footer = () => {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container-rtl py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 space-x-reverse">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-gold-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">إ</span>
              </div>
              <span className="text-xl font-bold text-gradient">متجر إيلياء</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              متجرك المفضل للأدوات المكتبية عالية الجودة بأفضل الأسعار.
            </p>
            <div className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
              <span>صُنع بـ</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>لأجلك</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">فئات المنتجات</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=notebooks" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  دفاتر وكراسات
                </Link>
              </li>
              <li>
                <Link to="/products?category=pens" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  أقلام وأدوات كتابة
                </Link>
              </li>
              <li>
                <Link to="/products?category=files" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  ملفات وحافظات
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  إكسسوارات مكتبية
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">01141792085</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">support@elliaa.com</span>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground"> مصر</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p dir="rtl" className="text-sm text-muted-foreground text-right w-full">
  جميع الحقوق محفوظة | متجر إيلياء © 2025
</p>


          <div className="flex items-center space-x-4 space-x-reverse mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              سياسة الخصوصية
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
