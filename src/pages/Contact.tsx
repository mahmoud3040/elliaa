
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: 'اتصل بنا',
      details: ['+20 123 456 7890', '+20 100 123 4567'],
      description: 'متاح من 9 صباحاً حتى 9 مساءً'
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: 'راسلنا',
      details: ['info@elyaastore.com', 'support@elyaastore.com'],
      description: 'نرد على رسائلك خلال 24 ساعة'
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: 'زورنا',
      details: ['القاهرة، مصر'],
      description: 'العنوان التفصيلي متاح عند الحاجة'
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: 'ساعات العمل',
      details: ['السبت - الخميس: 9ص - 9م', 'الجمعة: 2م - 9م'],
      description: 'خدمة عملاء متاحة دائماً'
    }
  ];

  const subjects = [
    'استفسار عام',
    'شكوى أو اقتراح',
    'مشكلة في الطلب',
    'استفسار عن منتج',
    'طلب عرض سعر',
    'أخرى'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "تم إرسال الرسالة",
        description: "شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-gold-50">
          <div className="container-rtl">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-gradient">تواصل معنا</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                نحن هنا لمساعدتك! تواصل معنا لأي استفسار أو مساعدة تحتاجها
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-background">
          <div className="container-rtl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card
                  key={info.title}
                  className="text-center hover-lift animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-gold-100 rounded-full flex items-center justify-center mx-auto">
                      {info.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm font-medium">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {info.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="animate-slide-in-left">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">أرسل لنا رسالة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">الاسم *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">البريد الإلكتروني *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">رقم الهاتف</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="01xxxxxxxxx"
                          />
                        </div>
                        <div>
                          <Label htmlFor="subject">موضوع الرسالة *</Label>
                          <Select onValueChange={(value) => handleInputChange('subject', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الموضوع" />
                            </SelectTrigger>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem key={subject} value={subject}>
                                  {subject}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message">الرسالة *</Label>
                        <Textarea
                          id="message"
                          rows={6}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="اكتب رسالتك هنا..."
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                        {!isSubmitting && <Send className="h-4 w-4 mr-2" />}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Map and Additional Info */}
              <div className="space-y-6 animate-scale-in">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">موقعنا</h3>
                    <div className="bg-muted/50 rounded-lg h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">خريطة تفاعلية قريباً</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">معلومات إضافية</h3>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <h4 className="font-medium text-primary">خدمة العملاء</h4>
                        <p className="text-muted-foreground">
                          فريق خدمة العملاء متاح للرد على استفساراتك من السبت إلى الخميس
                          من 9 صباحاً حتى 9 مساءً
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-primary">الطلبات والشحن</h4>
                        <p className="text-muted-foreground">
                          نقوم بمعالجة الطلبات خلال 24 ساعة والشحن لجميع محافظات مصر
                          خلال 1-3 أيام عمل
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-primary">الإرجاع والاستبدال</h4>
                        <p className="text-muted-foreground">
                          يمكنك إرجاع أو استبدال المنتجات خلال 7 أيام من تاريخ الاستلام
                          حسب الشروط والأحكام
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-rtl">
            <div className="text-center space-y-4 mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold">الأسئلة الشائعة</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                إجابات سريعة على أكثر الأسئلة شيوعاً
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  question: 'كيف يمكنني تتبع طلبي؟',
                  answer: 'سنرسل لك رقم التتبع عبر الرسائل النصية والبريد الإلكتروني فور شحن طلبك'
                },
                {
                  question: 'هل يمكنني إلغاء طلبي؟',
                  answer: 'يمكنك إلغاء طلبك خلال 24 ساعة من تقديمه قبل أن يتم شحنه'
                },
                {
                  question: 'ما هي طرق الدفع المتاحة؟',
                  answer: 'نقبل الدفع عند الاستلام، فوري، فودافون كاش، والبطاقات الائتمانية'
                },
                {
                  question: 'كم تستغرق عملية الشحن؟',
                  answer: 'الشحن داخل القاهرة والجيزة 1-2 يوم، والمحافظات الأخرى 2-3 أيام'
                }
              ].map((faq, index) => (
                <Card
                  key={index}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
