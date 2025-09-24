import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cartService } from '@/services/cartService';
import { catalogService } from '@/services/catalogService';
import { Cart, Product, Cook } from '@/types';
import { toast } from '@/hooks/use-toast';
import moroccanFoods from '@/assets/moroccan-foods.jpg';

export default function CartPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [cart, setCart] = useState<Cart | null>(null);
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [cooks, setCooks] = useState<Record<string, Cook>>({});
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const cartData = await cartService.getCart();
      setCart(cartData);

      // Load product and cook details
      const productIds = cartData.items.map(item => item.productId);
      const cookIds = [...new Set(cartData.items.map(item => item.cookId))];

      const [productsData, cooksData] = await Promise.all([
        Promise.all(productIds.map(id => catalogService.getProduct(id))),
        Promise.all(cookIds.map(id => catalogService.getCook(id)))
      ]);

      const productsMap: Record<string, Product> = {};
      const cooksMap: Record<string, Cook> = {};

      productsData.forEach(product => {
        if (product) productsMap[product.id] = product;
      });

      cooksData.forEach(cook => {
        if (cook) cooksMap[cook.id] = cook;
      });

      setProducts(productsMap);
      setCooks(cooksMap);
    } catch (error) {
      console.error('Failed to load cart:', error);
      toast({
        title: t('common.error'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = async (productId: string, newQty: number) => {
    try {
      const updatedCart = await cartService.updateQty(productId, newQty);
      setCart(updatedCart);
    } catch (error) {
      toast({
        title: t('common.error'),
        variant: 'destructive',
      });
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const updatedCart = await cartService.removeItem(productId);
      setCart(updatedCart);
      toast({
        title: isArabic ? 'تم حذف المنتج' : 'Produit supprimé',
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        variant: 'destructive',
      });
    }
  };

  const formatPrice = (price: number) => {
    return isArabic ? `${price} ${t('currency.mad')}` : `${price} ${t('currency.mad')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 pb-20">
        <div className="max-w-2xl mx-auto space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-16 bg-muted rounded"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background p-4 pb-20 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <img 
            src={moroccanFoods} 
            alt="Empty cart" 
            className="w-48 h-32 object-cover rounded-2xl mx-auto opacity-50"
          />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">{t('cart.empty')}</h2>
            <p className="text-muted-foreground">
              {isArabic ? 'ابدأ بإضافة بعض الأطباق اللذيذة' : 'Commencez à ajouter de délicieux plats'}
            </p>
          </div>
          <Link to="/">
            <Button className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              {isArabic ? 'تسوق الآن' : 'Commencer à acheter'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Group items by cook
  const itemsByCook = cart.items.reduce((groups, item) => {
    if (!groups[item.cookId]) {
      groups[item.cookId] = [];
    }
    groups[item.cookId].push(item);
    return groups;
  }, {} as Record<string, typeof cart.items>);

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">{t('cart.title')}</h1>
          <Badge variant="outline" className="text-base px-3 py-1">
            {cart.items.reduce((total, item) => total + item.qty, 0)} {isArabic ? 'منتج' : 'articles'}
          </Badge>
        </div>

        {Object.entries(itemsByCook).map(([cookId, items]) => {
          const cook = cooks[cookId];
          const cookSubtotal = items.reduce((sum, item) => sum + (item.qty * item.unitPriceMAD), 0);
          const deliveryFee = cart.deliveryFeesByCook[cookId] || 0;

          return (
            <Card key={cookId} className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>{cook ? (isArabic ? cook.displayNameAr : cook.displayNameFr) : 'طباخة'}</span>
                  {cook?.verified && (
                    <Badge variant="outline" className="text-xs bg-primary-soft text-primary">
                      ✓ {t('cook.verified')}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {items.map((item) => {
                  const product = products[item.productId];
                  if (!product) return null;

                  return (
                    <div key={item.productId} className="flex gap-4">
                      <img
                        src={product.images[0]}
                        alt={isArabic ? product.nameAr : product.nameFr}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-base">
                            {isArabic ? product.nameAr : product.nameFr}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.productId)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.productId, item.qty - 1)}
                              disabled={item.qty <= 1}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-medium px-2">{item.qty}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.productId, item.qty + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold">
                              {formatPrice(item.qty * item.unitPriceMAD)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(item.unitPriceMAD)} {isArabic ? 'لكل قطعة' : 'pièce'}
                            </p>
                          </div>
                        </div>

                        {cart.notesByItem?.[item.productId] && (
                          <div className="bg-muted p-2 rounded text-sm">
                            <strong>{t('cart.notes')}:</strong> {cart.notesByItem[item.productId]}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{t('cart.subtotal')}</span>
                    <span>{formatPrice(cookSubtotal)}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex justify-between">
                      <span>{t('cart.deliveryFee')}</span>
                      <span>{formatPrice(deliveryFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold">
                    <span>{t('cart.total')}</span>
                    <span>{formatPrice(cookSubtotal + deliveryFee)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Order Summary */}
        <Card className="shadow-elegant bg-gradient-subtle">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>{t('cart.total')}</span>
                <span className="text-2xl text-primary">{formatPrice(cart.totalMAD)}</span>
              </div>

              <Button 
                size="lg" 
                className="w-full gap-2 h-14 text-lg bg-gradient-primary hover:opacity-90"
              >
                <ShoppingBag className="h-5 w-5" />
                {t('cart.checkout')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}