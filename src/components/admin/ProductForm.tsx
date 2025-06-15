
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X, Upload, Save, ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';

interface ProductFormProps {
  product?: any;
  onClose: () => void;
}

const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    isNew: false,
    isFeatured: false,
    image: '',
    images: [] as string[],
    sku: '',
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        category: product.category || '',
        stock: product.stock || 0,
        isNew: product.isNew || false,
        isFeatured: product.isFeatured || false,
        image: product.image || '',
        images: product.images || [],
        sku: product.sku || '',
        weight: product.weight || 0,
        dimensions: product.dimensions || { length: 0, width: 0, height: 0 }
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // في التطبيق الحقيقي، ستحفظ في قاعدة البيانات
      console.log('حفظ المنتج:', formData);
      
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onClose();
    } catch (error) {
      console.error('خطأ في حفظ المنتج:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // في التطبيق الحقيقي، ستقوم برفع الصورة إلى خدمة التخزين
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {product ? 'تعديل المنتج' : 'إضافة منتج جديد'}
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">اسم المنتج *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="أدخل اسم المنتج"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">وصف المنتج</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="أدخل وصف تفصيلي للمنتج"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">السعر (ج.م) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="stock">الكمية في المخزون</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">الفئة</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
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
                <Label htmlFor="sku">رمز المنتج (SKU)</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                  placeholder="مثال: PEN-001"
                />
              </div>
            </div>

            {/* Product Image and Settings */}
            <div className="space-y-4">
              <div>
                <Label>صورة المنتج</Label>
                <div className="space-y-4">
                  {formData.image && (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="معاينة المنتج"
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      اسحب صورة هنا أو انقر للاختيار
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" size="sm">
                        اختيار صورة
                      </Button>
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isNew">منتج جديد</Label>
                  <Switch
                    id="isNew"
                    checked={formData.isNew}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isNew: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="isFeatured">منتج مميز</Label>
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
                  />
                </div>
              </div>

              <div>
                <Label>الأبعاد والوزن</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Input
                    placeholder="الطول (سم)"
                    type="number"
                    value={formData.dimensions.length}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      dimensions: { ...prev.dimensions, length: Number(e.target.value) }
                    }))}
                  />
                  <Input
                    placeholder="العرض (سم)"
                    type="number"
                    value={formData.dimensions.width}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      dimensions: { ...prev.dimensions, width: Number(e.target.value) }
                    }))}
                  />
                  <Input
                    placeholder="الارتفاع (سم)"
                    type="number"
                    value={formData.dimensions.height}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      dimensions: { ...prev.dimensions, height: Number(e.target.value) }
                    }))}
                  />
                  <Input
                    placeholder="الوزن (جم)"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.isNew && <Badge>جديد</Badge>}
                {formData.isFeatured && <Badge variant="secondary">مميز</Badge>}
                {formData.stock === 0 && <Badge variant="destructive">نفد من المخزون</Badge>}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 space-x-reverse pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? (
                'جاري الحفظ...'
              ) : (
                <>
                  <Save className="h-4 w-4 ml-2" />
                  {product ? 'تحديث المنتج' : 'إضافة المنتج'}
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
