
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const ConfigNotice = () => {
  return (
    <Alert className="border-orange-200 bg-orange-50 text-orange-800 mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>يتطلب ضبط رابط ووردبرس</AlertTitle>
      <AlertDescription className="mt-2 space-y-3">
        <p>
          لتشغيل المتجر بالكامل، يجب ضبط رابط موقع ووردبرس الخاص بك في ملف: 
          <code className="bg-orange-100 px-1 rounded mx-1">src/lib/woocommerce.ts</code>
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => window.open('https://docs.lovable.dev', '_blank')}
            className="text-orange-700 border-orange-300 hover:bg-orange-100"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            دليل التكامل مع ووردبرس
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => window.open('https://woocommerce.github.io/woocommerce-rest-api-docs/', '_blank')}
            className="text-orange-700 border-orange-300 hover:bg-orange-100"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            مستندات WooCommerce API
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ConfigNotice;
