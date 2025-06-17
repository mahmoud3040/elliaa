import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selected, setSelected] = useState(0);
  const [fade, setFade] = useState(false);

  const handleSelect = (idx: number) => {
    if (idx === selected) return;
    setFade(true);
    setTimeout(() => {
      setSelected(idx);
      setFade(false);
    }, 180);
  };

  const goNext = () => handleSelect((selected + 1) % images.length);
  const goPrev = () => handleSelect((selected - 1 + images.length) % images.length);

  return (
    <div>
      {/* الصورة الرئيسية */}
      <div className="relative flex items-center justify-center bg-white dark:bg-gray-900 rounded-xl border mb-4" style={{ minHeight: 320, height: 400 }}>
        {/* سهم يسار */}
        {images.length > 1 && (
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 border border-[#8B5CF6] text-[#8B5CF6] rounded-full p-2 shadow-md transition-all duration-200 hover:bg-[#8B5CF6] hover:text-white active:scale-90"
            style={{ boxShadow: "0 2px 8px #8B5CF633" }}
            aria-label="السابق"
          >
            <ChevronLeft className="w-6 h-6 transition-all duration-200" />
          </button>
        )}

        {/* الصورة */}
        <img
          src={images[selected]}
          alt={productName}
          className={`w-full h-full object-contain transition-opacity duration-300 ${fade ? "opacity-0" : "opacity-100"}`}
          style={{ maxHeight: 380, minHeight: 320 }}
        />

        {/* سهم يمين */}
        {images.length > 1 && (
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 border border-[#8B5CF6] text-[#8B5CF6] rounded-full p-2 shadow-md transition-all duration-200 hover:bg-[#8B5CF6] hover:text-white active:scale-90"
            style={{ boxShadow: "0 2px 8px #8B5CF633" }}
            aria-label="التالي"
          >
            <ChevronRight className="w-6 h-6 transition-all duration-200" />
          </button>
        )}
      </div>

      {/* الصور المصغرة */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${selected === idx ? "border-[#8B5CF6] shadow-lg" : "border-transparent"}`}
            onClick={() => handleSelect(idx)}
          >
            <img
              src={img}
              alt={`${productName} - صورة ${idx + 1}`}
              className="w-full h-20 object-contain bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery; 