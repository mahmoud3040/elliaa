
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  LogOut
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminProductsTable from '@/components/admin/AdminProductsTable';
import AdminOrdersTable from '@/components/admin/AdminOrdersTable';
import AdminDashboard from '@/components/admin/AdminDashboard';
import ProductForm from '@/components/admin/ProductForm';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [adminUsername, setAdminUsername] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const username = localStorage.getItem('admin_username');
    if (username) {
      setAdminUsername(username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_username');
    toast({
      title: "تم تسجيل الخروج",
      description: "شكراً لاستخدامك لوحة التحكم",
    });
    navigate('/admin/login');
  };

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        {/* Admin Header */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="container-rtl py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gradient">لوحة تحكم متجر إيلياء</h1>
                <p className="text-muted-foreground">إدارة شاملة للمتجر الإلكتروني</p>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="text-right">
                  <p className="text-sm font-medium">مرحباً، {adminUsername}</p>
                  <Badge variant="outline" className="lavender-gradient text-white">
                    مدير
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4 ml-2" />
                  تسجيل خروج
                </Button>
                <div className="w-8 h-8 lavender-gradient rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-rtl py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-96">
              <TabsTrigger value="dashboard">الرئيسية</TabsTrigger>
              <TabsTrigger value="products">المنتجات</TabsTrigger>
              <TabsTrigger value="orders">الطلبات</TabsTrigger>
              <TabsTrigger value="customers">العملاء</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <AdminDashboard />
            </TabsContent>

            <TabsContent value="products">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">إدارة المنتجات</h2>
                  <Button 
                    onClick={() => {
                      setEditingProduct(null);
                      setShowProductForm(true);
                    }}
                    className="btn-primary"
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة منتج جديد
                  </Button>
                </div>
                {showProductForm ? (
                  <ProductForm 
                    product={editingProduct}
                    onClose={() => {
                      setShowProductForm(false);
                      setEditingProduct(null);
                    }}
                    onSave={(product) => {
                      console.log('حفظ المنتج:', product);
                      toast({
                        title: editingProduct ? "تم تحديث المنتج" : "تم إضافة المنتج",
                        description: "تم حفظ بيانات المنتج بنجاح",
                      });
                      setShowProductForm(false);
                      setEditingProduct(null);
                    }}
                  />
                ) : (
                  <AdminProductsTable 
                    onEdit={(product) => {
                      setEditingProduct(product);
                      setShowProductForm(true);
                    }}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">إدارة الطلبات</h2>
                <AdminOrdersTable />
              </div>
            </TabsContent>

            <TabsContent value="customers">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">إدارة العملاء</h2>
                <Card>
                  <CardContent className="p-8 text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">قسم إدارة العملاء قيد التطوير</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminProtectedRoute>
  );
};

export default Admin;
