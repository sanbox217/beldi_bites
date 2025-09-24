import { useTranslation } from 'react-i18next';
import { Star, Plus, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Product, Cook } from '@/types';
import { cartService } from '@/services/cartService';
import { useFavorites } from '@/hooks/useFavorites';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  cook?: Cook;
  onAddToCart?: () => void;
  isLoading?: boolean;
}

export function ProductCard({ product, cook, onAddToCart, isLoading = false }: ProductCardProps) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const { toggleProductFavorite, isProductFavorite } = useFavorites();
  const isFavorite = isProductFavorite(product.id);

  const handleAddToCart = async () => {
    try {
      await cartService.addItem(
        product.id,
        product.cookId,
        1,
        product.priceMAD
      );
      
      toast({
        title: t('product.addToCart'),
        description: `${isArabic ? product.nameAr : product.nameFr}`,
      });
      
      onAddToCart?.();
    } catch (error) {
      toast({
        title: t('common.error'),
        variant: 'destructive',
      });
    }
  };

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleProductFavorite(
      product.id,
      isArabic ? product.nameAr : product.nameFr
    );
  };

  const formatPrice = (price: number) => {
    return isArabic ? `${price} ${t('currency.mad')}` : `${price} ${t('currency.mad')}`;
  };

  return (
    <Card className={cn(
      "group overflow-hidden hover-lift bg-card border shadow-soft transition-all",
      isLoading && "optimistic-update"
    )}>
      <div className="relative aspect-square overflow-hidden bg-muted">
        <OptimizedImage
          src={product.images[0]}
          alt={isArabic ? product.nameAr : product.nameFr}
          className="h-full w-full group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 w-8 h-8 rounded-full"
          onClick={handleFavoriteToggle}
        >
          <Heart className={cn(
            "h-4 w-4 transition-all",
            isFavorite ? "fill-red-500 text-red-500 animate-heart" : "text-gray-600"
          )} />
        </Button>

        {product.tags.includes('bestseller') && (
          <Badge className="absolute top-2 left-2 bg-accent-warm text-accent-warm-foreground">
            ⭐ {isArabic ? 'الأكثر مبيعاً' : 'Bestseller'}
          </Badge>
        )}
        {!product.availableToday && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">
              {isArabic ? 'غير متوفر اليوم' : 'Non disponible'}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg leading-tight">
            {isArabic ? product.nameAr : product.nameFr}
          </h3>
          {cook && (
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <span>{isArabic ? cook.displayNameAr : cook.displayNameFr}</span>
              {cook.verified && <Badge variant="outline" className="text-xs">✓</Badge>}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xl font-bold text-primary">
              {formatPrice(product.priceMAD)}
            </p>
            {product.leadTimeHours && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {product.leadTimeHours} {t('product.hours')}
              </p>
            )}
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!product.availableToday}
            size="sm"
            className="gap-2 bg-primary hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">{t('product.addToCart')}</span>
          </Button>
        </div>

        {cook && (
          <div className="flex items-center gap-2 pt-2 border-t">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-sm">{cook.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({cook.reviewCount} {t('product.reviews')})
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}