
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  reviewCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  stock?: number;
  sku?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  features: string[];
  specifications?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: 'pens',
    name: 'أقلام',
    description: 'أقلام حبر جاف وأقلام رصاص',
    image: '/placeholder.svg',
    icon: '✏️'
  },
  {
    id: 'notebooks',
    name: 'دفاتر',
    description: 'دفاتر ملاحظات وكشاكيل',
    image: '/placeholder.svg',
    icon: '📓'
  },
  {
    id: 'stationery',
    name: 'أدوات مكتبية',
    description: 'مساطر، مبراة، ممحاة وأدوات أخرى',
    image: '/placeholder.svg',
    icon: '📐'
  },
  {
    id: 'organizers',
    name: 'منظمات',
    description: 'حافظات ومنظمات المكتب',
    image: '/placeholder.svg',
    icon: '🗂️'
  },
  {
    id: 'art-supplies',
    name: 'أدوات فنية',
    description: 'أقلام ملونة وأدوات الرسم',
    image: '/placeholder.svg',
    icon: '🎨'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'قلم حبر جاف أزرق - عبوة 10 قطع',
    description: 'أقلام حبر جاف عالية الجودة باللون الأزرق، مثالية للاستخدام اليومي في المكتب والمدرسة. حبر ناعم وسلس.',
    price: 45,
    originalPrice: 60,
    category: 'أقلام',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop'
    ],
    rating: 4.5,
    reviews: 128,
    reviewCount: 128,
    isNew: true,
    isFeatured: true,
    isOnSale: true,
    stock: 50,
    sku: 'PEN-BLUE-10',
    weight: 120,
    dimensions: { length: 15, width: 3, height: 1 },
    features: ['حبر ناعم وسلس', 'تصميم مريح للإمساك', 'يدوم لفترة طويلة', 'مقاوم للتسريب'],
    specifications: {
      'نوع الحبر': 'حبر جاف',
      'اللون': 'أزرق',
      'العدد': '10 قطع',
      'المادة': 'بلاستيك عالي الجودة'
    }
  },
  {
    id: '2',
    name: 'دفتر ملاحظات A4 - 200 ورقة',
    description: 'دفتر ملاحظات عالي الجودة بحجم A4، يحتوي على 200 ورقة مسطرة. مثالي للطلاب والموظفين.',
    price: 35,
    category: 'دفاتر',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    ],
    rating: 4.8,
    reviews: 89,
    reviewCount: 89,
    isNew: false,
    isFeatured: true,
    stock: 30,
    sku: 'NOTE-A4-200',
    weight: 300,
    dimensions: { length: 29.7, width: 21, height: 1.5 },
    features: ['ورق عالي الجودة', 'مسطر بشكل مثالي', 'غلاف قوي', 'سهل الحمل'],
    specifications: {
      'الحجم': 'A4',
      'عدد الأوراق': '200 ورقة',
      'نوع الورق': 'مسطر',
      'الغلاف': 'كرتون مقوى'
    }
  },
  {
    id: '3',
    name: 'مجموعة أقلام ملونة - 24 لون',
    description: 'مجموعة أقلام ملونة متنوعة تضم 24 لون زاهي. مثالية للرسم والتلوين والأعمال الفنية.',
    price: 85,
    originalPrice: 100,
    category: 'أدوات فنية',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop'
    ],
    rating: 4.7,
    reviews: 156,
    reviewCount: 156,
    isNew: true,
    isFeatured: false,
    isOnSale: true,
    stock: 25,
    sku: 'COLOR-24',
    weight: 200,
    dimensions: { length: 20, width: 15, height: 2 },
    features: ['24 لون متنوع', 'ألوان زاهية', 'سهلة الاستخدام', 'مقاومة للبهتان'],
    specifications: {
      'عدد الألوان': '24 لون',
      'النوع': 'أقلام ملونة',
      'المادة': 'خشب طبيعي',
      'الاستخدام': 'رسم وتلوين'
    }
  },
  {
    id: '4',
    name: 'مسطرة بلاستيك 30 سم',
    description: 'مسطرة بلاستيكية شفافة بطول 30 سم مع تدريج واضح. مقاومة للكسر ومناسبة للاستخدام المدرسي.',
    price: 12,
    category: 'أدوات مكتبية',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=400&fit=crop'
    ],
    rating: 4.3,
    reviews: 67,
    reviewCount: 67,
    isNew: false,
    isFeatured: false,
    stock: 100,
    sku: 'RULER-30',
    weight: 25,
    dimensions: { length: 30, width: 3, height: 0.3 },
    features: ['شفافة ومقاومة للكسر', 'تدريج واضح', 'سهلة الاستخدام', 'حافة مستقيمة'],
    specifications: {
      'الطول': '30 سم',
      'المادة': 'بلاستيك شفاف',
      'التدريج': 'سنتيمتر وملليمتر',
      'السماكة': '3 ملم'
    }
  },
  {
    id: '5',
    name: 'كشكول سلك 200 ورقة',
    description: 'كشكول بسلك معدني قوي، يحتوي على 200 ورقة مسطرة عالية الجودة. سهل الفتح والإغلاق.',
    price: 28,
    category: 'دفاتر',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop'
    ],
    rating: 4.6,
    reviews: 94,
    reviewCount: 94,
    isNew: false,
    isFeatured: true,
    stock: 40,
    sku: 'SPIRAL-200',
    weight: 250,
    dimensions: { length: 25, width: 18, height: 1.2 },
    features: ['سلك معدني قوي', 'ورق عالي الجودة', 'غلاف مقاوم', 'سهل التقليب'],
    specifications: {
      'عدد الأوراق': '200 ورقة',
      'النوع': 'كشكول سلك',
      'الحجم': '25×18 سم',
      'الورق': 'مسطر'
    }
  },
  {
    id: '6',
    name: 'قلم رصاص HB - عبوة 12 قطعة',
    description: 'أقلام رصاص درجة HB عالية الجودة، مثالية للكتابة والرسم. خشب طبيعي ومريحة في الاستخدام.',
    price: 24,
    category: 'أقلام',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop'
    ],
    rating: 4.4,
    reviews: 112,
    reviewCount: 112,
    isNew: false,
    isFeatured: false,
    stock: 75,
    sku: 'PENCIL-HB-12',
    weight: 80,
    dimensions: { length: 17.5, width: 2, height: 2 },
    features: ['درجة HB مثالية', 'خشب طبيعي عالي الجودة', 'سهل البري', 'مريح في الاستخدام'],
    specifications: {
      'الدرجة': 'HB',
      'العدد': '12 قطعة',
      'المادة': 'خشب طبيعي',
      'الطول': '17.5 سم'
    }
  }
];

// إضافة دالة للحصول على المنتج بالمعرف
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
