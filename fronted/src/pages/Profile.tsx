import { useTranslation } from 'react-i18next';
import { User, MapPin, Heart, CreditCard, Bell, Settings, LogOut, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Mock user data
const mockUser = {
  name: 'أحمد المغربي',
  email: 'ahmed@example.com',
  phone: '+212 6 12 34 56 78',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  joinedDate: '2024-01-01',
  ordersCount: 12,
  favoriteCount: 8,
  reviewsCount: 5
};

const menuItems = [
  { icon: MapPin, key: 'addresses', titleAr: 'عناويني', titleFr: 'Mes adresses' },
  { icon: Heart, key: 'favorites', titleAr: 'المفضلة', titleFr: 'Favoris' },
  { icon: CreditCard, key: 'payment', titleAr: 'وسائل الدفع', titleFr: 'Moyens de paiement' },
  { icon: Bell, key: 'notifications', titleAr: 'الإشعارات', titleFr: 'Notifications' },
  { icon: Settings, key: 'settings', titleAr: 'الإعدادات', titleFr: 'Paramètres' },
];

export default function Profile() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="shadow-soft pattern-subtle">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 border-4 border-primary/20">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback className="bg-primary-soft text-primary text-xl font-bold">
                  {mockUser.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{mockUser.name}</h1>
                  <p className="text-muted-foreground">{mockUser.email}</p>
                  <p className="text-sm text-muted-foreground">{mockUser.phone}</p>
                </div>

                <div className="flex gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-lg text-primary">{mockUser.ordersCount}</p>
                    <p className="text-muted-foreground">{t('nav.orders')}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg text-accent-warm">{mockUser.favoriteCount}</p>
                    <p className="text-muted-foreground">{isArabic ? 'مفضلة' : 'Favoris'}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg text-accent-cool">{mockUser.reviewsCount}</p>
                    <p className="text-muted-foreground">{isArabic ? 'تقييمات' : 'Avis'}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-2xl font-bold text-foreground">4.8</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {isArabic ? 'متوسط التقييم' : 'Note moyenne'}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-2">2.1K</div>
              <p className="text-sm text-muted-foreground">
                {isArabic ? 'نقاط الولاء' : 'Points fidélité'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">{isArabic ? 'حسابي' : 'Mon compte'}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <div key={item.key}>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-14 px-6 rounded-none"
                >
                  <item.icon className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span className="flex-1 text-left">
                    {isArabic ? item.titleAr : item.titleFr}
                  </span>
                  <span className="text-muted-foreground">›</span>
                </Button>
                {index < menuItems.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Become a Cook */}
        <Card className="shadow-soft bg-gradient-warm text-white">
          <CardContent className="p-6 text-center space-y-4">
            <div className="text-4xl mb-2">👩‍🍳</div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                {isArabic ? 'كوني طباخة معنا!' : 'Devenez cuisinière!'}
              </h3>
              <p className="text-white/90 text-sm">
                {isArabic 
                  ? 'شاركي طبخك المنزلي واكسبي دخلاً إضافياً'
                  : 'Partagez votre cuisine maison et gagnez un revenu supplémentaire'
                }
              </p>
            </div>
            <Button variant="secondary" className="bg-white text-accent-warm hover:bg-white/90">
              {isArabic ? 'ابدئي الآن' : 'Commencer maintenant'}
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="shadow-soft">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-start h-14 px-6 text-destructive hover:text-destructive hover:bg-destructive/5"
            >
              <LogOut className="h-5 w-5 mr-3" />
              {isArabic ? 'تسجيل الخروج' : 'Se déconnecter'}
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground py-4">
          <p>
            {isArabic 
              ? `عضو منذ ${new Date(mockUser.joinedDate).getFullYear()}`
              : `Membre depuis ${new Date(mockUser.joinedDate).getFullYear()}`
            }
          </p>
        </div>
      </div>
    </div>
  );
}