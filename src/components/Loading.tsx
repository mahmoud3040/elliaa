
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 lavender-gradient rounded-full animate-pulse-glow"></div>
          <Loader2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-white animate-spin" />
        </div>
        <p className="text-muted-foreground font-medium">جاري التحميل...</p>
      </div>
    </div>
  );
};

export default Loading;
