
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  features: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isOnSale?: boolean;
  specifications?: Record<string, string>;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'دفتر ملاحظات جلدي فاخر - A5',
    price: 89,
    originalPrice: 120,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
    ],
    category: 'دفاتر وكراسات',
    description: 'دفتر ملاحظات أنيق بغلاف جلدي فاخر، مثالي للاستخدام المهني والشخصي. يحتوي على 200 صفحة من الورق عالي الجودة.',
    features: [
      'غلاف جلدي فاخر',
      '200 صفحة ورق عالي الجودة',
      'حجم A5 مناسب للحمل',
      'إغلاق مغناطيسي',
      'شريط إشارة مدمج'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 125,
    isOnSale: true,
    specifications: {
      'الحجم': 'A5 (14.8 × 21 سم)',
      'عدد الصفحات': '200 صفحة',
      'نوع الورق': 'ورق كريمي 80 جرام',
      'نوع التجليد': 'خياطة مقوى',
      'المادة': 'جلد طبيعي'
    }
  },
  {
    id: '2',
    name: 'قلم حبر جاف أزرق - عبوة 12 قطعة',
    price: 25,
    image: 'https://images.unsplash.com/photo-1586952518485-11b180e92764?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586952518485-11b180e92764?w=400&h=400&fit=crop',
    ],
    category: 'أقلام وأدوات كتابة',
    description: 'أقلام حبر جاف عالية الجودة بحبر أزرق، مناسبة للاستخدام اليومي في المكتب والمدرسة.',
    features: [
      'حبر أزرق سلس',
      'قبضة مريحة',
      'يدوم طويلاً',
      'عبوة اقتصادية 12 قطعة',
      'مناسب للكتابة اليومية'
    ],
    inStock: true,
    rating: 4.5,
    reviewCount: 89,
    isNew: true,
    specifications: {
      'نوع الحبر': 'حبر جاف أزرق',
      'سمك الخط': '1.0 مم',
      'الطول': '14 سم',
      'العدد': '12 قطعة'
    }
  },
  {
    id: '3',
    name: 'ملف حفظ بلاستيكي شفاف - A4',
    price: 15,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop',
    ],
    category: 'ملفات وحافظات',
    description: 'ملف حفظ شفاف من البلاستيك المقوى، مثالي لحفظ الوثائق والأوراق المهمة.',
    features: [
      'بلاستيك شفاف مقوى',
      'حجم A4 قياسي',
      'إغلاق آمن',
      'مقاوم للماء',
      'سهل الحمل'
    ],
    inStock: true,
    rating: 4.3,
    reviewCount: 67,
    specifications: {
      'الحجم': 'A4 (21 × 29.7 سم)',
      'المادة': 'بلاستيك PP شفاف',
      'السماكة': '0.5 مم',
      'نوع الإغلاق': 'زر بلاستيكي'
    }
  },
  {
    id: '4',
    name: 'آلة حاسبة علمية متقدمة',
    price: 145,
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop',
    ],
    category: 'إكسسوارات مكتبية',
    description: 'آلة حاسبة علمية متقدمة بشاشة كبيرة وواضحة، مناسبة للطلاب والمهندسين.',
    features: [
      'شاشة LCD كبيرة',
      'أكثر من 240 وظيفة',
      'تشغيل بالطاقة الشمسية والبطارية',
      'ذاكرة متقدمة',
      'تصميم مقاوم للصدمات'
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 93,
    isNew: true,
    specifications: {
      'نوع الشاشة': 'LCD مزدوجة السطر',
      'عدد الوظائف': '240+ وظيفة',
      'مصدر الطاقة': 'شمسي + بطارية',
      'الأبعاد': '16 × 8 × 1.5 سم'
    }
  },
  {
    id: '5',
    name: 'مقص مكتبي احترافي - 21 سم',
    price: 35,
    image: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=400&h=400&fit=crop',
    ],
    category: 'إكسسوارات مكتبية',
    description: 'مقص مكتبي احترافي بشفرات حادة من الستانلس ستيل، مناسب لجميع أنواع القص.',
    features: [
      'شفرات ستانلس ستيل حادة',
      'مقبض مريح',
      'مناسب لليد اليمنى واليسرى',
      'قص دقيق ونظيف',
      'متين وطويل الأمد'
    ],
    inStock: true,
    rating: 4.6,
    reviewCount: 78,
    specifications: {
      'الطول': '21 سم',
      'مادة الشفرات': 'ستانلس ستيل',
      'مادة المقبض': 'بلاستيك مقوى',
      'الوزن': '85 جرام'
    }
  },
  {
    id: '6',
    name: 'دباسة معدنية قوية - 24/6',
    price: 55,
    image: 'https://images.unsplash.com/photo-1625225233840-695456021cde?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1625225233840-695456021cde?w=400&h=400&fit=crop',
    ],
    category: 'إكسسوارات مكتبية',
    description: 'دباسة معدنية قوية ومتينة، تدبس حتى 25 ورقة بسهولة. مناسبة للاستخدام المكثف.',
    features: [
      'هيكل معدني قوي',
      'تدبس حتى 25 ورقة',
      'حجم دبوس 24/6',
      'قاعدة مطاطية مانعة للانزلاق',
      'تصميم عملي ومتين'
    ],
    inStock: true,
    rating: 4.4,
    reviewCount: 112,
    specifications: {
      'حجم الدبوس': '24/6',
      'سعة التدبيس': '25 ورقة',
      'المادة': 'معدن مطلي',
      'الأبعاد': '15 × 5 × 4 سم'
    }
  }
];

export const categories = [
  { id: 'notebooks', name: 'دفاتر وكراسات', icon: '📓' },
  { id: 'pens', name: 'أقلام وأدوات كتابة', icon: '✏️' },
  { id: 'files', name: 'ملفات وحافظات', icon: '📁' },
  { id: 'accessories', name: 'إكسسوارات مكتبية', icon: '📐' },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => 
    product.category === category || 
    categories.find(cat => cat.id === category)?.name === product.category
  );
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};
