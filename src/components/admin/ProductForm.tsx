
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { X, Save, Package, Loader2 } from 'lucide-react';
import { categories } from '@/data/products';
import { useProducts } from '@/hooks/useProducts';

interface ProductFormProps {
  product?: any;
  onClose: () => void;
  onSave: (product: any) => void;
}

const ProductForm = ({ product, onClose, onSave }: ProductFormProps) => {
  const { addProduct, updateProduct } = useProducts();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: '',
    image: '',
    images: [''],
    stock: 0,
    sku: '',
    weight: 0,
    isNew: false,
    isFeatured: false,
    isOnSale: false,
    features: [''],
    specifications: {},
    rating: 4.5,
    reviews: 0,
    reviewCount: 0,
    dimensions: { length: 20, width: 15, height: 5 }
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || '',
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        originalPrice: product.originalPrice || 0,
        category: product.category || '',
        image: product.image || '',
        images: product.images || [''],
        stock: product.stock || 0,
        sku: product.sku || '',
        weight: product.weight || 0,
        isNew: product.isNew || false,
        isFeatured: product.isFeatured || false,
        isOnSale: product.isOnSale || false,
        features: product.features || [''],
        specifications: product.specifications || {},
        rating: product.rating || 4.5,
        reviews: product.reviews || 0,
        reviewCount: product.reviewCount || 0,
        dimensions: product.dimensions || { length: 20, width: 15, height: 5 }
      });
    } else {
      // Reset form for new product
      setFormData({
        id: '',
        name: '',
        description: '',
        price: 0,
        originalPrice: 0,
        category: '',
        image: '',
        images: [''],
        stock: 0,
        sku: '',
        weight: 0,
        isNew: false,
        isFeatured: false,
        isOnSale: false,
        features: [''],
        specifications: {},
        rating: 4.5,
        reviews: 0,
        reviewCount: 0,
        dimensions: { length: 20, width: 15, height: 5 }
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const productData = {
      ...formData,
      id: formData.id || `product_${Date.now()}`,
      images: [formData.image],
      features: formData.features.filter(f => f.trim() !== '')
    };

    let success = false;
    if (product) {
      success = await updateProduct(productData);
    } else {
      success = await addProduct(productData);
    }

    if (success) {
      onSave(productData);
    }
    
    setIsLoading(false);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <Package className="h-5 w-5" />
            <span>{product ? 'تعديل المنتج' : 'إضافة منتج جديد'}</span>
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">اسم المنتج</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="أدخل اسم المنتج"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="description">وصف المنتج</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="أدخل وصف المنتج"
                  rows={4}
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="category">الفئة</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => updateFormData('category', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="image">رابط الصورة</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => updateFormData('image', e.target.value)}
                  placeholder="أدخل رابط صورة المنتج"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">السعر</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => updateFormData('price', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="originalPrice">السعر الأصلي</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => updateFormData('originalPrice', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stock">المخزون</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => updateFormData('stock', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    min="0"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="sku">رمز المنتج (SKU)</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => updateFormData('sku', e.target.value)}
                    placeholder="أدخل رمز المنتج"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="weight">الوزن (جرام)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => updateFormData('weight', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                  disabled={isLoading}
                />
              </div>

              {/* Product Flags */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isNew">منتج جديد</Label>
                  <Switch
                    id="isNew"
                    checked={formData.isNew}
                    onCheckedChange={(checked) => updateFormData('isNew', checked)}
                    disabled={isLoading}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="isFeatured">منتج مميز</Label>
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => updateFormData('isFeatured', checked)}
                    disabled={isLoading}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="isOnSale">خصم خاص</Label>
                  <Switch
                    id="isOnSale"
                    checked={formData.isOnSale}
                    onCheckedChange={(checked) => updateFormData('isOnSale', checked)}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <Label>مميزات المنتج</Label>
            <div className="space-y-2 mt-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 space-x-reverse">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="أدخل ميزة المنتج"
                    disabled={isLoading}
                  />
                  {formData.features.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeFeature(index)}
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addFeature}
                disabled={isLoading}
              >
                إضافة ميزة جديدة
              </Button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 space-x-reverse pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              إلغاء
            </Button>
            <Button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                  {product ? 'جاري التحديث...' : 'جاري الحفظ...'}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 ml-2" />
                  {product ? 'تحديث المنتج' : 'حفظ المنتج'}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
