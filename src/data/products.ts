
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  stock?: number;
  sku?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: 'pens',
    name: 'أقلام',
    description: 'أقلام حبر جاف وأقلام رصاص',
    image: '/placeholder.svg'
  },
  {
    id: 'notebooks',
    name: 'دفاتر',
    description: 'دفاتر ملاحظات وكشاكيل',
    image: '/placeholder.svg'
  },
  {
    id: 'stationery',
    name: 'أدوات مكتبية',
    description: 'مساطر، مبراة، ممحاة وأدوات أخرى',
    image: '/placeholder.svg'
  },
  {
    id: 'organizers',
    name: 'منظمات',
    description: 'حافظات ومنظمات المكتب',
    image: '/placeholder.svg'
  },
  {
    id: 'art-supplies',
    name: 'أدوات فنية',
    description: 'أقلام ملونة وأدوات الرسم',
    image: '/placeholder.svg'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'قلم حبر جاف أزرق - عبوة 10 قطع',
    description: 'أقلام حبر جاف عالية الجودة باللون الأزرق، مثالية للاستخدام اليومي في المكتب والمدرسة. حبر ناعم وسلس.',
    price: 45,
    category: 'أقلام',
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg'],
    rating: 4.5,
    reviews: 128,
    isNew: true,
    isFeatured: true,
    stock: 50,
    sku: 'PEN-BLUE-10',
    weight: 120,
    dimensions: { length: 15, width: 3, height: 1 }
  },
  {
    id: '2',
    name: 'دفتر ملاحظات A4 - 200 ورقة',
    description: 'دفتر ملاحظات عالي الجودة بحجم A4، يحتوي على 200 ورقة مسطرة. مثالي للطلاب والموظفين.',
    price: 35,
    category: 'دفاتر',
    image: '/placeholder.svg',
    rating: 4.8,
    reviews: 89,
    isNew: false,
    isFeatured: true,
    stock: 30,
    sku: 'NOTE-A4-200',
    weight: 300,
    dimensions: { length: 29.7, width: 21, height: 1.5 }
  },
  {
    id: '3',
    name: 'مجموعة أقلام ملونة - 24 لون',
    description: 'مجموعة أقلام ملونة متنوعة تضم 24 لون زاهي. مثالية للرسم والتلوين والأعمال الفنية.',
    price: 85,
    category: 'أدوات فنية',
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: 156,
    isNew: true,
    isFeatured: false,
    stock: 25,
    sku: 'COLOR-24',
    weight: 200,
    dimensions: { length: 20, width: 15, height: 2 }
  },
  {
    id: '4',
    name: 'مسطرة بلاستيك 30 سم',
    description: 'مسطرة بلاستيكية شفافة بطول 30 سم مع تدريج واضح. مقاومة للكسر ومناسبة للاستخدام المدرسي.',
    price: 12,
    category: 'أدوات مكتبية',
    image: '/placeholder.svg',
    rating: 4.3,
    reviews: 67,
    isNew: false,
    isFeatured: false,
    stock: 100,
    sku: 'RULER-30',
    weight: 25,
    dimensions: { length: 30, width: 3, height: 0.3 }
  },
  {
    id: '5',
    name: 'كشكول سلك 200 ورقة',
    description: 'كشكول بسلك معدني قوي، يحتوي على 200 ورقة مسطرة عالية الجودة. سهل الفتح والإغلاق.',
    price: 28,
    category: 'دفاتر',
    image: '/placeholder.svg',
    rating: 4.6,
    reviews: 94,
    isNew: false,
    isFeatured: true,
    stock: 40,
    sku: 'SPIRAL-200',
    weight: 250,
    dimensions: { length: 25, width: 18, height: 1.2 }
  },
  {
    id: '6',
    name: 'قلم رصاص HB - عبوة 12 قطعة',
    description: 'أقلام رصاص درجة HB عالية الجودة، مثالية للكتابة والرسم. خشب طبيعي ومريحة في الاستخدام.',
    price: 24,
    category: 'أقلام',
    image: '/placeholder.svg',
    rating: 4.4,
    reviews: 112,
    isNew: false,
    isFeatured: false,
    stock: 75,
    sku: 'PENCIL-HB-12',
    weight: 80,
    dimensions: { length: 17.5, width: 2, height: 2 }
  },
  {
    id: '7',
    name: 'حافظة مستندات A4 بلاستيك',
    description: 'حافظة مستندات شفافة بحجم A4 مع إغلاق بزر. مقاومة للماء ومثالية لحفظ الأوراق المهمة.',
    price: 18,
    category: 'منظمات',
    image: '/placeholder.svg',
    rating: 4.5,
    reviews: 78,
    isNew: true,
    isFeatured: false,
    stock: 60,
    sku: 'FOLDER-A4',
    weight: 45,
    dimensions: { length: 31, width: 22, height: 0.5 }
  },
  {
    id: '8',
    name: 'ممحاة بيضاء كبيرة',
    description: 'ممحاة بيضاء عالية الجودة لمحو أقلام الرصاص. لا تترك آثاراً ولا تمزق الورق.',
    price: 8,
    category: 'أدوات مكتبية',
    image: '/placeholder.svg',
    rating: 4.2,
    reviews: 45,
    isNew: false,
    isFeatured: false,
    stock: 150,
    sku: 'ERASER-WHITE',
    weight: 15,
    dimensions: { length: 5, width: 2, height: 1 }
  },
  {
    id: '9',
    name: 'مبراة معدنية مزدوجة',
    description: 'مبراة معدنية بفتحتين مختلفتين للأقلام العادية والسميكة. تصميم كلاسيكي وعملي.',
    price: 15,
    category: 'أدوات مكتبية',
    image: '/placeholder.svg',
    rating: 4.6,
    reviews: 89,
    isNew: false,
    isFeatured: false,
    stock: 80,
    sku: 'SHARP-METAL',
    weight: 35,
    dimensions: { length: 4, width: 2.5, height: 1.5 }
  },
  {
    id: '10',
    name: 'دفتر رسم A3 - 50 ورقة',
    description: 'دفتر رسم بحجم A3 مع ورق عالي الجودة مناسب للرسم بالقلم الرصاص والألوان المائية.',
    price: 65,
    category: 'أدوات فنية',
    image: '/placeholder.svg',
    rating: 4.8,
    reviews: 67,
    isNew: true,
    isFeatured: true,
    stock: 20,
    sku: 'SKETCH-A3-50',
    weight: 400,
    dimensions: { length: 42, width: 29.7, height: 1 }
  },
  {
    id: '11',
    name: 'قلم تحديد أصفر - عبوة 6 قطع',
    description: 'أقلام تحديد باللون الأصفر الفلوريسنت. حبر عالي الجودة لا يتسرب ولا يجف بسرعة.',
    price: 32,
    category: 'أقلام',
    image: '/placeholder.svg',
    rating: 4.4,
    reviews: 92,
    isNew: false,
    isFeatured: false,
    stock: 45,
    sku: 'HIGHLIGHT-YEL-6',
    weight: 90,
    dimensions: { length: 14, width: 2, height: 2 }
  },
  {
    id: '12',
    name: 'منظم مكتب خشبي',
    description: 'منظم مكتب أنيق من الخشب الطبيعي مع عدة حجرات لتنظيم الأقلام والأدوات المكتبية.',
    price: 120,
    category: 'منظمات',
    image: '/placeholder.svg',
    rating: 4.9,
    reviews: 34,
    isNew: true,
    isFeatured: true,
    stock: 15,
    sku: 'ORG-WOOD',
    weight: 800,
    dimensions: { length: 25, width: 15, height: 10 }
  }
];
