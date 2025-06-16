import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wooCommerce } from '@/lib/woocommerce';
import { toast } from '@/hooks/use-toast';

export interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  governorate: string;
  postalCode: string;
  paymentMethod: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  shipping: number;
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: OrderData) => {
      // تمرير طريقة الدفع المختارة فعليًا
      const wooOrderData = {
        payment_method: orderData.paymentMethod,
        payment_method_title: orderData.paymentMethod,
        billing: {
          first_name: orderData.firstName,
          last_name: orderData.lastName,
          email: orderData.email,
          phone: orderData.phone,
          address_1: orderData.address,
          city: orderData.city,
          state: orderData.governorate,
          postcode: orderData.postalCode,
          country: 'EG',
        },
        shipping: {
          first_name: orderData.firstName,
          last_name: orderData.lastName,
          address_1: orderData.address,
          city: orderData.city,
          state: orderData.governorate,
          postcode: orderData.postalCode,
          country: 'EG',
        },
        line_items: orderData.items.map(item => ({
          product_id: parseInt(item.id),
          quantity: item.quantity,
        })),
        shipping_lines: orderData.shipping > 0 ? [{
          method_id: 'flat_rate',
          method_title: 'شحن عادي',
          total: orderData.shipping.toString(),
        }] : [],
      };

      return wooCommerce.createOrder(wooOrderData);
    },
    onSuccess: (data) => {
      toast({
        title: "تم تأكيد الطلب",
        description: `رقم الطلب: ${data.id}`,
      });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.error('Order creation error:', error);
      toast({
        title: "خطأ في إنشاء الطلب",
        description: "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    },
  });
};
