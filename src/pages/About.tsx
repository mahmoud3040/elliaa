import { Heart, Users, Award, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const About = () => {
  const values = [{
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'رؤيتنا',
    description: 'أن نكون المتجر الرائد في مصر لتوفير الأدوات المكتبية عالية الجودة'
  }, {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: 'مهمتنا',
    description: 'نسعى لتوفير أفضل المنتجات المكتبية بأسعار مناسبة وخدمة عملاء متميزة'
  }, {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: 'قيمنا',
    description: 'الجودة، الأمانة، الابتكار، وخدمة العملاء هي أساس عملنا'
  }, {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'فريقنا',
    description: 'فريق متخصص وشغوف بتقديم أفضل تجربة تسوق لعملائنا'
  }];
  const stats = [{
    number: '5+',
    label: 'سنوات خبرة'
  }, {
    number: '500+',
    label: 'منتج متاح'
  }, {
    number: '1000+',
    label: 'عميل راضي'
  }, {
    number: '27',
    label: 'محافظة نخدمها'
  }];
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-gold-50">
          <div className="container-rtl">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-gradient">من نحن</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">متجر إيلياء هو وجهتك المفضلة للحصول على أفضل الأدوات المكتبية  في مصر. نحن نؤمن بأن الأدوات الجيدة تساعد على الإبداع والإنجاز.
متجر 
إيلياء يتميز بالهوية الإسلامية والعربية.</p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-background">
          <div className="container-rtl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slide-in-left">
                <h2 className="text-3xl font-bold">قصتنا</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>بدأت رحلة متجر إيلياء من فكرة بسيطة: توفير مخططات و أدوات مكتبية عالية الجودة بأسعار مناسبة لجميع شرائح المجتمع المصري. منذ تأسيسنا، نسعى لأن نكون الخيار الأول لكل من يريد التخطيط وتحقيق التميز والسعي نحو الإنتاجية.</p>
                  <p>
                    نحن نختار منتجاتنا بعناية فائقة من أفضل الموردين، ونضمن جودتها 
                    قبل وصولها إليك. فريقنا يعمل بشغف لتوفير تجربة تسوق مميزة 
                    وخدمة عملاء استثنائية.
                  </p>
                  <p>
                    اليوم، نفخر بخدمة آلاف العملاء في جميع أنحاء مصر، ونواصل 
                    السعي لتطوير خدماتنا وتوسيع مجموعة منتجاتنا لتلبية احتياجاتكم المتنوعة.
                  </p>
                </div>
              </div>
              
              <div className="relative animate-scale-in">
                <img src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=600&h=400&fit=crop" alt="مكتب العمل" className="rounded-lg shadow-xl" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/20 to-gold-200 rounded-full blur-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-rtl">
            <div className="text-center space-y-4 mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold">قيمنا ومبادئنا</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                نؤمن بمجموعة من القيم والمبادئ التي توجه عملنا وتشكل هويتنا
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => <Card key={value.title} className="text-center p-6 hover-lift animate-scale-in" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <CardContent className="p-0 space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-gold-100 rounded-full flex items-center justify-center mx-auto">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-gold-500">
          <div className="container-rtl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => <div key={stat.label} className="text-center text-white animate-scale-in" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-primary-foreground/90">{stat.label}</div>
                </div>)}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-background">
          <div className="container-rtl">
            <div className="text-center space-y-4 mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold">فريق العمل</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                نحن فريق شغوف ومتفاني، نعمل معاً لتحقيق رؤيتنا وخدمة عملائنا الكرام
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[{
              name: 'أحمد محمد',
              role: 'المدير العام',
              image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
            }, {
              name: 'فاطمة علي',
              role: 'مدير خدمة العملاء',
              image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e6?w=300&h=300&fit=crop&crop=face'
            }, {
              name: 'محمد حسن',
              role: 'مدير المبيعات',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
            }].map((member, index) => <Card key={member.name} className="text-center hover-lift animate-scale-in" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <CardContent className="p-6 space-y-4">
                    <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto object-cover" />
                    <div>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-muted-foreground">{member.role}</p>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container-rtl text-center">
            <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold">تواصل معنا</h2>
              <p className="text-muted-foreground text-lg">
                هل لديك أسئلة أو تحتاج مساعدة؟ فريقنا جاهز لمساعدتك في أي وقت
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+201234567890" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  <span>اتصل بنا</span>
                </a>
                <a href="mailto:info@elyaastore.com" className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
                  <span>راسلنا</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default About;