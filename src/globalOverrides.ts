// src/globalOverrides.ts

// تقييم المنتجات دائماً 5
export function getProductRating() {
  return 5;
}

// حساب تكلفة الشحن حسب المحافظة
export function getShippingCost(governorate: string): number {
  const cairoList = [
    "القاهرة", "الجيزة", "الشرقية", "الاسماعيلية", "الدقهلية", "الغربية", "القليوبية", "المنوفية"
  ];
  const alexList = [
    "الاسكندرية", "البحيرة", "السويس", "بورسعيد", "الفيوم", "بني سويف", "دمياط", "شمال سيناء", "كفر الشيخ"
  ];
  const minyaList = [
    "المنيا", "جنوب سيناء"
  ];

  if (cairoList.includes(governorate)) return 50;
  if (alexList.includes(governorate)) return 55;
  if (minyaList.includes(governorate)) return 70;
  return 85;
} 