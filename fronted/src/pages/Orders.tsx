import { useTranslation } from 'react-i18next';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import moroccanFoods from '@/assets/moroccan-foods.jpg';

// Mock data for demonstration
const mockOrders = [
  {
    id: 'ORD-001',
    status: 'confirmed',
    totalMAD: 67,
    createdAt: '2024-01-15T10:30:00Z',
    items: [
      { name: 'مسمن منزلي', quantity: 4, price: 18 },
      { name: 'حرشة بالسميد', quantity: 2, price: 8 }
    ],
    cookName: 'حليمة - مخبزة البيت',
    deliveryType: 'delivery',
    estimatedTime: '45 دقيقة'
  }
];

export default function Orders() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'confirmed':
      case 'preparing':
      case 'out_for_delivery':
        return <Package className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'canceled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      pending: isArabic ? 'في الانتظار' : 'En attente',
      confirmed: isArabic ? 'مؤكد' : 'Confirmé',
      preparing: isArabic ? 'قيد التحضير' : 'En préparation',
      out_for_delivery: isArabic ? 'في الطريق' : 'En livraison',
      ready_for_pickup: isArabic ? 'جاهز للاستلام' : 'Prêt à récupérer',
      completed: isArabic ? 'مكتمل' : 'Terminé',
      canceled: isArabic ? 'ملغي' : 'Annulé'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const formatPrice = (price: number) => {
    return isArabic ? `${price} ${t('currency.mad')}` : `${price} ${t('currency.mad')}`;
  };

  if (mockOrders.length === 0) {
    return (
      <div className="min-h-screen bg-background p-4 pb-20 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <img 
            src={moroccanFoods} 
            alt="No orders" 
            className="w-48 h-32 object-cover rounded-2xl mx-auto opacity-50"
          />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              {isArabic ? 'لا توجد طلبات بعد' : 'Aucune commande encore'}
            </h2>
            <p className="text-muted-foreground">
              {isArabic 
                ? 'عندما تطلب شيئاً، ستظهر طلباتك هنا'
                : 'Quand vous commandez quelque chose, vos commandes apparaîtront ici'
              }
            </p>
          </div>
          <Button className="gap-2">
            <Package className="h-4 w-4" />
            {isArabic ? 'ابدأ الطلب' : 'Commencer à commander'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-foreground">{t('nav.orders')}</h1>

        <div className="space-y-4">
          {mockOrders.map((order) => (
            <Card key={order.id} className="shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {isArabic ? `طلب #${order.id}` : `Commande #${order.id}`}
                  </CardTitle>
                  <Badge className={`gap-1 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {getStatusText(order.status)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {order.cookName}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-sm font-medium">
                        {formatPrice(item.quantity * item.price)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between items-center font-semibold">
                    <span>{t('cart.total')}</span>
                    <span className="text-lg text-primary">
                      {formatPrice(order.totalMAD)}
                    </span>
                  </div>
                  
                  {order.status === 'confirmed' && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {isArabic 
                          ? `الوقت المقدر: ${order.estimatedTime}`
                          : `Temps estimé: ${order.estimatedTime}`
                        }
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    {isArabic ? 'تتبع الطلب' : 'Suivre la commande'}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    {isArabic ? 'طلب مرة أخرى' : 'Commander à nouveau'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}