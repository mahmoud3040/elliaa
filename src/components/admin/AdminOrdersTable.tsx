
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Edit, Package, Clock, CheckCircle, XCircle } from 'lucide-react';

const AdminOrdersTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock orders data - في التطبيق الحقيقي ستأتي من قاعدة البيانات
  const orders = [
    {
      id: 'ORD001',
      customer: 'أحمد محمد علي',
      email: 'ahmed@example.com',
      phone: '01234567890',
      items: [
        { name: 'قلم حبر جاف أزرق', quantity: 2, price: 15 },
        { name: 'دفتر ملاحظات A4', quantity: 1, price: 45 }
      ],
      total: 75,
      status: 'pending',
      paymentMethod: 'cash_on_delivery',
      address: 'القاهرة، مصر الجديدة، شارع النزهة 15',
      date: '2024-06-15T10:30:00',
      notes: 'يرجى الاتصال قبل التسليم'
    },
    {
      id: 'ORD002',
      customer: 'فاطمة حسن',
      email: 'fatima@example.com',
      phone: '01123456789',
      items: [
        { name: 'مجموعة أقلام ملونة', quantity: 1, price: 85 },
        { name: 'مسطرة 30 سم', quantity: 2, price: 12 }
      ],
      total: 109,
      status: 'processing',
      paymentMethod: 'vodafone_cash',
      address: 'الجيزة، المهندسين، شارع التحرير 8',
      date: '2024-06-14T14:15:00',
      notes: ''
    },
    {
      id: 'ORD003',
      customer: 'محمد سعد',
      email: 'mohamed@example.com',
      phone: '01987654321',
      items: [
        { name: 'كشكول سلك 200 ورقة', quantity: 3, price: 25 },
        { name: 'قلم رصاص HB', quantity: 5, price: 8 }
      ],
      total: 115,
      status: 'completed',
      paymentMethod: 'fawry',
      address: 'الإسكندرية، سيدي جابر، شارع الجيش 25',
      date: '2024-06-13T09:45:00',
      notes: 'تم التسليم بنجاح'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'قيد الانتظار', color: 'text-yellow-600 border-yellow-600', icon: Clock },
      processing: { label: 'قيد التنفيذ', color: 'text-blue-600 border-blue-600', icon: Package },
      completed: { label: 'مكتمل', color: 'text-green-600 border-green-600', icon: CheckCircle },
      cancelled: { label: 'ملغي', color: 'text-red-600 border-red-600', icon: XCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;

    const Icon = config.icon;

    return (
      <Badge variant="outline" className={config.color}>
        <Icon className="h-3 w-3 ml-1" />
        {config.label}
      </Badge>
    );
  };

  const getPaymentMethodLabel = (method: string) => {
    const methods = {
      cash_on_delivery: 'الدفع عند الاستلام',
      vodafone_cash: 'فودافون كاش',
      fawry: 'فوري',
      credit_card: 'بطاقة ائتمان'
    };
    return methods[method as keyof typeof methods] || method;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    console.log(`تحديث حالة الطلب ${orderId} إلى ${newStatus}`);
    // في التطبيق الحقيقي، ستحدث قاعدة البيانات
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <Package className="h-5 w-5" />
            <span>إدارة الطلبات ({filteredOrders.length})</span>
          </CardTitle>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 sm:space-x-reverse">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="تصفية حسب الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="processing">قيد التنفيذ</SelectItem>
                <SelectItem value="completed">مكتمل</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في الطلبات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {currentOrders.map((order) => (
            <Card key={order.id} className="border-l-4 border-l-primary/20">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Order Info */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">طلب رقم #{order.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString('ar-EG')} - {new Date(order.date).toLocaleTimeString('ar-EG')}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">معلومات العميل</h4>
                        <p className="text-sm">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.email}</p>
                        <p className="text-sm text-muted-foreground">{order.phone}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">عنوان التسليم</h4>
                        <p className="text-sm text-muted-foreground">{order.address}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">المنتجات</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                            <span className="text-sm">{item.name}</span>
                            <span className="text-sm font-medium">
                              {item.quantity} × {item.price} ج.م = {item.quantity * item.price} ج.م
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.notes && (
                      <div>
                        <h4 className="font-medium mb-2">ملاحظات</h4>
                        <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded-lg">
                          {order.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Order Actions */}
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">ملخص الطلب</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>المجموع:</span>
                          <span className="font-bold text-primary">{order.total} ج.م</span>
                        </div>
                        <div className="flex justify-between">
                          <span>طريقة الدفع:</span>
                          <span>{getPaymentMethodLabel(order.paymentMethod)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">تحديث الحالة</label>
                      <Select 
                        value={order.status} 
                        onValueChange={(value) => updateOrderStatus(order.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">قيد الانتظار</SelectItem>
                          <SelectItem value="processing">قيد التنفيذ</SelectItem>
                          <SelectItem value="completed">مكتمل</SelectItem>
                          <SelectItem value="cancelled">ملغي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 ml-2" />
                        عرض التفاصيل
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 ml-2" />
                        تعديل الطلب
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              عرض {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredOrders.length)} من {filteredOrders.length}
            </p>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                السابق
              </Button>
              <span className="text-sm">
                {currentPage} من {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                التالي
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminOrdersTable;
