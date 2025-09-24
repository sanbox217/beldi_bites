import { useTranslation } from 'react-i18next';
import { Star, MapPin, Clock, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Cook } from '@/types';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';

interface CookCardProps {
  cook: Cook;
  onClick?: () => void;
  isLoading?: boolean;
}

export function CookCard({ cook, onClick, isLoading = false }: CookCardProps) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const { toggleCookFavorite, isCookFavorite } = useFavorites();
  const isFavorite = isCookFavorite(cook.id);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleCookFavorite(
      cook.id,
      isArabic ? cook.displayNameAr : cook.displayNameFr
    );
  };

  return (
    <Card 
      className={cn(
        "group cursor-pointer hover-lift overflow-hidden bg-card border shadow-soft transition-all",
        isLoading && "optimistic-update"
      )}
      onClick={onClick}
    >
      <CardContent className="p-0">
        {/* Cover Image */}
        <div className="relative h-24 overflow-hidden bg-gradient-primary">
          {cook.coverUrl && (
            <OptimizedImage
              src={cook.coverUrl}
              alt={`${isArabic ? cook.displayNameAr : cook.displayNameFr} cover`}
              className="h-full w-full object-cover"
            />
          )}
          
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
        </div>

        <div className="p-4 space-y-3 relative">
          {/* Avatar overlapping the cover */}
          <div className="flex items-start gap-3 -mt-8">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-background overflow-hidden bg-muted">
                <OptimizedImage
                  src={cook.avatarUrl}
                  alt={isArabic ? cook.displayNameAr : cook.displayNameFr}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1 mt-8 space-y-1">
              <h3 className="font-semibold text-lg leading-tight">
                {isArabic ? cook.displayNameAr : cook.displayNameFr}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{cook.neighborhood}</span>
              </div>
            </div>
          </div>

          {/* Rating and delivery info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{cook.rating}</span>
              <span className="text-muted-foreground">({cook.reviewCount})</span>
            </div>
            
            {cook.delivery.enabled && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">{cook.delivery.radiusKm}km توصيل</span>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1">
            {cook.verified && (
              <Badge variant="outline" className="text-xs bg-primary-soft text-primary border-primary/20">
                {t('cook.verified')}
              </Badge>
            )}
            {cook.badges.includes('on-time') && (
              <Badge variant="outline" className="text-xs bg-accent-cool-soft text-accent-cool border-accent-cool/20">
                <Clock className="h-3 w-3 mr-1" />
                {t('cook.onTime')}
              </Badge>
            )}
            {cook.badges.includes('bestseller') && (
              <Badge variant="outline" className="text-xs bg-accent-warm-soft text-accent-warm border-accent-warm/20">
                ⭐ {isArabic ? 'مميزة' : 'Top'}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}