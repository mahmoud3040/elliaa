import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useProducts, useCategories } from '@/hooks/useWooProducts';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products from WooCommerce
  const { data: products = [], isLoading: productsLoading, error: productsError } = useProducts({
    search: searchQuery || undefined,
  });

  // Fetch categories from WooCommerce
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.some(category =>
          product.category.toLowerCase().includes(category.toLowerCase()) ||
          categories.find(cat => cat.id === category)?.name === product.category
        )
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return a.name.localeCompare(b.name, 'ar');
      }
    });

    return filtered;
  }, [products, selectedCategories, sortBy, priceRange, categories]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(cat => cat !== category));
    }
  };

  if (productsError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-red-600">خطأ في تحميل المنتجات</h1>
            <p className="text-muted-foreground">
              تأكد من ضبط رابط ووردبرس في ملف woocommerce.ts
            </p>
            <p className="text-sm text-muted-foreground">
              يجب استبدال YOUR_WORDPRESS_SITE_URL برابط موقعك
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 bg-background">
        <div className="container-rtl">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">جميع المنتجات</h1>
            <p className="text-muted-foreground">اكتشف مجموعتنا الكاملة من الأدوات المكتبية</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-lg">المرشحات</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </CardHeader>
                
                <CardContent className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Search */}
                  <div className="space-y-2">
                    <Label>البحث</Label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="ابحث عن منتج..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  {!categoriesLoading && categories.length > 0 && (
                    <div className="space-y-3">
                      <Label>الفئات</Label>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox
                              id={category.id}
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={(checked) =>
                                handleCategoryChange(category.id, checked as boolean)
                              }
                            />
                            <Label htmlFor={category.id} className="text-sm font-normal">
                              {category.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price Range */}
                  <div className="space-y-3">
                    <Label>نطاق السعر</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Input
                          type="number"
                          placeholder="من"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-20"
                        />
                        <span>-</span>
                        <Input
                          type="number"
                          placeholder="إلى"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-20"
                        />
                        <span className="text-sm text-muted-foreground">ج.م</span>
                      </div>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategories([]);
                      setPriceRange([0, 1000]);
                    }}
                  >
                    مسح المرشحات
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Sort Bar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} منتج
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="ترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">الاسم</SelectItem>
                    <SelectItem value="price-low">السعر: من الأقل</SelectItem>
                    <SelectItem value="price-high">السعر: من الأعلى</SelectItem>
                    <SelectItem value="rating">التقييم</SelectItem>
                    <SelectItem value="newest">الأحدث</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Products */}
              {productsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-48 bg-muted rounded-t-lg" />
                      <CardContent className="p-4 space-y-3">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      image={product.image}
                      images={product.images}
                      category={product.category}
                      rating={product.rating}
                      isNew={product.isNew}
                      isOnSale={product.isOnSale}
                      type={product.type}
                      attributes={product.attributes}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">لا توجد منتجات تطابق المرشحات المحددة</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
