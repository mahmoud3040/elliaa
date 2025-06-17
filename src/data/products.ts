// This file is now replaced by WooCommerce API
// Keeping for backward compatibility during transition

import { getProductRating } from '@/globalOverrides';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isOnSale: boolean;
  features: string[];
  specifications?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

// Fallback data for development/testing
export const products: Product[] = [
  {
    id: '1',
    name: 'قلم حبر سائل فاخر',
    price: 75,
    description: 'قلم حبر سائل فاخر بتصميم أنيق وكتابة سلسة، مثالي للاستخدام اليومي والمناسبات الرسمية.',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc1b25e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVufGVufDB8fDB8fHww',
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc1b25e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVufGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1607006344380-b6775a0824ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVufGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1560166444-7c9ee606f2eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlbnxlbnwwfHwwfHx8MA%3D%3D'
    ],
    category: 'الأقلام',
    rating: getProductRating(),
    reviewCount: 125,
    isNew: true,
    isOnSale: false,
    features: [
      'حبر سائل عالي الجودة',
      'جسم معدني فاخر',
      'كتابة سلسة ومريحة',
      'يأتي في علبة هدية أنيقة'
    ],
    specifications: {
      'المادة': 'معدن',
      'اللون': 'أسود وذهبي',
      'سمك الخط': '0.5 مم',
      'الوزن': '25 جرام'
    }
  },
  {
    id: '2',
    name: 'مجموعة أقلام ملونة 24 لون',
    price: 120,
    originalPrice: 150,
    description: 'مجموعة أقلام ملونة احترافية تحتوي على 24 لون زاهي، مثالية للرسم والتلوين والتصميم.',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sb3JlZCUyMHBlbmNpbHN8ZW58MHx8MHx8fDA%3D',
    images: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sb3JlZCUyMHBlbmNpbHN8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1522111608460-19e7331e00fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29sb3JlZCUyMHBlbmNpbHN8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1535342371209-4b2f0352074a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbG9yZWQlMjBwZW5jaWxzfGVufDB8fDB8fHww'
    ],
    category: 'الأقلام',
    rating: getProductRating(),
    reviewCount: 89,
    isNew: false,
    isOnSale: true,
    features: [
      '24 لون زاهي',
      'ألوان قابلة للمزج',
      'خشب عالي الجودة',
      'سهلة البري والاستخدام',
      'علبة معدنية للحفظ'
    ],
    specifications: {
      'عدد الألوان': '24',
      'المادة': 'خشب',
      'سمك القلم': '7 مم',
      'مناسبة لـ': 'الرسم والتلوين'
    }
  },
  {
    id: '3',
    name: 'دفتر ملاحظات جلد فاخر',
    price: 95,
    description: 'دفتر ملاحظات بغلاف جلدي فاخر وأوراق عالية الجودة، مثالي لتدوين الملاحظات والأفكار.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5vdGVib29rfGVufDB8fDB8fHww',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5vdGVib29rfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5vdGVib29rfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bm90ZWJvb2t8ZW58MHx8MHx8fDA%3D'
    ],
    category: 'الدفاتر',
    rating: getProductRating(),
    reviewCount: 56,
    isNew: false,
    isOnSale: false,
    features: [
      'غلاف جلدي فاخر',
      'ورق كريمي عالي الجودة',
      '192 صفحة مسطرة',
      'شريط مؤشر',
      'جيب داخلي'
    ],
    specifications: {
      'المقاس': 'A5',
      'عدد الصفحات': '192',
      'نوع الورق': 'كريمي 100 جرام',
      'لون الغلاف': 'بني داكن'
    }
  },
  {
    id: '4',
    name: 'حقيبة أدوات مدرسية',
    price: 65,
    originalPrice: 85,
    description: 'حقيبة أدوات مدرسية عملية بتصميم أنيق، مناسبة لحفظ الأقلام والمستلزمات المكتبية.',
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVuY2lsJTIwY2FzZXxlbnwwfHwwfHx8MA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1588072432836-e10032774350?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVuY2lsJTIwY2FzZXxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVuY2lsJTIwY2FzZXxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1596265371388-43edbaadab94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVuY2lsJTIwYmFnfGVufDB8fDB8fHww'
    ],
    category: 'الإكسسوارات',
    rating: getProductRating(),
    reviewCount: 42,
    isNew: false,
    isOnSale: true,
    features: [
      'تصميم عملي وأنيق',
      'جيوب متعددة',
      'سحاب عالي الجودة',
      'مقاومة للماء'
    ],
    specifications: {
      'الأبعاد': '22 × 10 × 5 سم',
      'المادة': 'قماش مقاوم للماء',
      'اللون': 'أزرق داكن',
      'السعة': '20-25 قلم'
    }
  },
  {
    id: '5',
    name: 'آلة حاسبة علمية',
    price: 110,
    description: 'آلة حاسبة علمية متطورة مع وظائف متعددة، مثالية للطلاب والمهندسين والمحاسبين.',
    image: 'https://images.unsplash.com/photo-1574607383476-f517f260d30b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FsY3VsYXRvcnxlbnwwfHwwfHx8MA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1574607383476-f517f260d30b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FsY3VsYXRvcnxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FsY3VsYXRvcnxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhbGN1bGF0b3J8ZW58MHx8MHx8fDA%3D'
    ],
    category: 'أدوات مكتبية',
    rating: getProductRating(),
    reviewCount: 78,
    isNew: true,
    isOnSale: false,
    features: [
      '240 وظيفة علمية',
      'شاشة LCD كبيرة',
      'ذاكرة داخلية',
      'تعمل بالطاقة الشمسية والبطارية',
      'غطاء حماية صلب'
    ],
    specifications: {
      'عدد الوظائف': '240',
      'نوع الشاشة': 'LCD',
      'مصدر الطاقة': 'شمسي وبطارية',
      'الأبعاد': '16 × 8 × 1.5 سم'
    }
  },
  {
    id: '6',
    name: 'مجموعة ملفات بلاستيكية ملونة',
    price: 45,
    description: 'مجموعة من 5 ملفات بلاستيكية ملونة لتنظيم وحفظ الأوراق والمستندات بشكل مرتب.',
    image: 'https://images.unsplash.com/photo-1583377519891-1ecc0cbbb9c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvbGRlcnN8ZW58MHx8MHx8fDA%3D',
    images: [
      'https://images.unsplash.com/photo-1583377519891-1ecc0cbbb9c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvbGRlcnN8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9sZGVyc3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1542879436-58a77e4ad04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvbGRlcnN8ZW58MHx8MHx8fDA%3D'
    ],
    category: 'أدوات مكتبية',
    rating: getProductRating(),
    reviewCount: 35,
    isNew: false,
    isOnSale: false,
    features: [
      '5 ألوان مختلفة',
      'بلاستيك متين',
      'سعة كبيرة',
      'تصميم مقاوم للماء'
    ],
    specifications: {
      'العدد': '5 ملفات',
      'المقاس': 'A4',
      'المادة': 'بلاستيك PP',
      'السعة': '100 ورقة لكل ملف'
    }
  },
  {
    id: '7',
    name: 'مسطرة هندسية متعددة الوظائف',
    price: 35,
    description: 'مسطرة هندسية متعددة الوظائف مصنوعة من الألمنيوم، مثالية للرسم الهندسي والفني.',
    image: 'https://images.unsplash.com/photo-1616248304589-6a3d8d60ad7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJ1bGVyfGVufDB8fDB8fHww',
    images: [
      'https://images.unsplash.com/photo-1616248304589-6a3d8d60ad7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJ1bGVyfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cnVsZXJ8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cnVsZXJ8ZW58MHx8MHx8fDA%3D'
    ],
    category: 'أدوات مكتبية',
    rating: getProductRating(),
    reviewCount: 28,
    isNew: false,
    isOnSale: false,
    features: [
      'مصنوعة من الألمنيوم',
      'قياسات دقيقة',
      'حواف مانعة للانزلاق',
      'تصميم مضاد للخدش'
    ],
    specifications: {
      'الطول': '30 سم',
      'المادة': 'ألمنيوم',
      'الوزن': '45 جرام',
      'اللون': 'فضي'
    }
  },
  {
    id: '8',
    name: 'لوح كتابة ممغنط',
    price: 85,
    originalPrice: 100,
    description: 'لوح كتابة ممغنط بإطار خشبي أنيق، مثالي للمنزل والمكتب وغرفة الدراسة.',
    image: 'https://images.unsplash.com/photo-1596902852634-9eb7a7e09aa6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hpdGVib2FyZHxlbnwwfHwwfHx8MA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1596902852634-9eb7a7e09aa6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hpdGVib2FyZHxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2hpdGVib2FyZHxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bm90ZWJvb2t8ZW58MHx8MHx8fDA%3D'
    ],
    category: 'أدوات مكتبية',
    rating: getProductRating(),
    reviewCount: 52,
    isNew: false,
    isOnSale: true,
    features: [
      'سطح أبيض عالي الجودة',
      'إطار خشبي أنيق',
      'يشمل 3 أقلام ملونة وممحاة',
      'سهل التركيب والتنظيف'
    ],
    specifications: {
      'الأبعاد': '60 × 45 سم',
      'المادة': 'خشب وسطح معدني مطلي',
      'يشمل': '3 أقلام، ممحاة، 4 مغناطيس',
      'الوزن': '1.2 كجم'
    }
  },
  {
    id: '9',
    name: 'مجموعة أوراق ملاحظات لاصقة',
    price: 25,
    description: 'مجموعة متنوعة من أوراق الملاحظات اللاصقة بألوان وأحجام مختلفة للاستخدام اليومي.',
    image: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RpY2t5JTIwbm90ZXN8ZW58MHx8MHx8fDA%3D',
    images: [
      'https://images.unsplash.com/photo-1586282391129-76a6df230234?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RpY2t5JTIwbm90ZXN8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RpY2t5JTIwbm90ZXN8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bm90ZWJvb2t8ZW58MHx8MHx8fDA%3D'
    ],
    category: 'أدوات مكتبية',
    rating: getProductRating(),
    reviewCount: 47,
    isNew: false,
    isOnSale: false,
    features: [
      '6 ألوان مختلفة',
      'لاصق قوي',
      'سهلة الإزالة',
      'لا تترك أثر'
    ],
    specifications: {
      'العدد': '6 دفاتر',
      'عدد الأوراق': '100 ورقة لكل دفتر',
      'المقاس': '76 × 76 مم',
      'الألوان': 'أصفر، أخضر، وردي، برتقالي، أزرق، أبيض'
    }
  },
  {
    id: '10',
    name: 'حقيبة ظهر مدرسية',
    price: 150,
    originalPrice: 180,
    description: 'حقيبة ظهر مدرسية عملية ومريحة بتصميم عصري، مناسبة للطلاب والاستخدام اليومي.',
    image: 'https://images.unsplash.com/photo-1598302936625-6075fbd98dd4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJhY2twYWNrfGVufDB8fDB8fHww',
    images: [
      'https://images.unsplash.com/photo-1598302936625-6075fbd98dd4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJhY2twYWNrfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja3BhY2t8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhY2twYWNrfGVufDB8fDB8fHww'
    ],
    category: 'الإكسسوارات',
    rating: getProductRating(),
    reviewCount: 63,
    isNew: true,
    isOnSale: true,
    features: [
      'تصميم عصري وأنيق',
      'جيوب متعددة',
      'مقاومة للماء',
      'أحزمة كتف مبطنة',
      'مساحة للاب توب'
    ],
    specifications: {
      'الأبعاد': '45 × 30 × 15 سم',
      'المادة': 'بوليستر عالي الجودة',
      'السعة': '25 لتر',
      'اللون': 'أزرق داكن'
    }
  },
  {
    id: '11',
    name: 'دفتر رسم فني A4',
    price: 55,
    description: 'دفتر رسم فني بورق عالي الجودة مناسب للرسم بالألوان المائية والأكريليك والفحم.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2tldGNoJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2tldGNoJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1602734846297-9299fc2d4703?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2tldGNoJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNrZXRjaCUyMGJvb2t8ZW58MHx8MHx8fDA%3D'
    ],
    category: 'الدفاتر',
    rating: getProductRating(),
    reviewCount: 38,
    isNew: false,
    isOnSale: false,
    features: [
      'ورق سميك 180 جرام',
      'مناسب لمختلف تقنيات الرسم',
      'سلك حلزوني متين',
      'غلاف خلفي صلب'
    ],
    specifications: {
      'المقاس': 'A4',
      'عدد الصفحات': '40',
      'وزن الورق': '180 جرام',
      'نوع التجليد': 'سلك حلزوني'
    }
  },
  {
    id: '12',
    name: 'طقم أقلام جل ملونة',
    price: 60,
    description: 'طقم أقلام جل ملونة بألوان زاهية وكتابة سلسة، مثالية للكتابة والرسم والتلوين.',
    image: 'https://images.unsplash.com/photo-1563053722-76a5d70e2edd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdlbCUyMHBlbnN8ZW58MHx8MHx8fDA%3D',
    images: [
      'https://images.unsplash.com/photo-1563053722-76a5d70e2edd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdlbCUyMHBlbnN8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1568205612837-017257d2310a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VsJTIwcGVuc3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1595231712325-9fedecef7575?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdlbCUyMHBlbnN8ZW58MHx8MHx8fDA%3D'
    ],
    category: 'الأقلام',
    rating: getProductRating(),
    reviewCount: 72,
    isNew: true,
    isOnSale: false,
    features: [
      '12 لون مختلف',
      'حبر جل عالي الجودة',
      'كتابة سلسة بدون تقطيع',
      'تصميم مريح للإمساك'
    ],
    specifications: {
      'العدد': '12 قلم',
      'سمك الخط': '0.5 مم',
      'نوع الحبر': 'جل',
      'العبوة': 'علبة بلاستيكية شفافة'
    }
  }
];

export const categories: Category[] = [
  { id: 'pens', name: 'الأقلام', icon: '✏️' },
  { id: 'notebooks', name: 'الدفاتر', icon: '📓' },
  { id: 'office', name: 'أدوات مكتبية', icon: '📎' },
  { id: 'accessories', name: 'الإكسسوارات', icon: '🎒' },
];

export const getProductById = (id: string): Product | null => {
  console.warn('getProductById is deprecated. Use useProduct hook instead.');
  return products.find(product => product.id === id) || null;
};
