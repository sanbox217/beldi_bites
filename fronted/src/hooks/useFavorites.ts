import { useState, useEffect, useCallback } from 'react';
import { favoritesService, Favorites } from '@/services/favoritesService';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorites>({ products: [], cooks: [] });
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await favoritesService.getFavorites();
        setFavorites(data);
      } catch (error) {
        console.error('Failed to load favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const toggleProductFavorite = useCallback(async (productId: string, productName?: string) => {
    const wasOptimistic = favoritesService.isProductFavorite(productId);
    
    // Optimistic update
    setFavorites(prev => ({
      ...prev,
      products: wasOptimistic 
        ? prev.products.filter(id => id !== productId)
        : [...prev.products, productId]
    }));

    try {
      const result = await favoritesService.toggleProductFavorite(productId);
      setFavorites(result.favorites);
      
      toast({
        title: result.isFavorite ? t('favorites.added') : t('favorites.removed'),
        description: productName || t('favorites.product'),
      });
    } catch (error) {
      // Revert optimistic update
      setFavorites(prev => ({
        ...prev,
        products: wasOptimistic 
          ? [...prev.products, productId]
          : prev.products.filter(id => id !== productId)
      }));
      
      toast({
        title: t('common.error'),
        variant: 'destructive',
      });
    }
  }, [t]);

  const toggleCookFavorite = useCallback(async (cookId: string, cookName?: string) => {
    const wasOptimistic = favoritesService.isCookFavorite(cookId);
    
    // Optimistic update
    setFavorites(prev => ({
      ...prev,
      cooks: wasOptimistic 
        ? prev.cooks.filter(id => id !== cookId)
        : [...prev.cooks, cookId]
    }));

    try {
      const result = await favoritesService.toggleCookFavorite(cookId);
      setFavorites(result.favorites);
      
      toast({
        title: result.isFavorite ? t('favorites.added') : t('favorites.removed'),
        description: cookName || t('favorites.cook'),
      });
    } catch (error) {
      // Revert optimistic update
      setFavorites(prev => ({
        ...prev,
        cooks: wasOptimistic 
          ? [...prev.cooks, cookId]
          : prev.cooks.filter(id => id !== cookId)
      }));
      
      toast({
        title: t('common.error'),
        variant: 'destructive',
      });
    }
  }, [t]);

  const isProductFavorite = useCallback((productId: string) => {
    return favorites.products.includes(productId);
  }, [favorites.products]);

  const isCookFavorite = useCallback((cookId: string) => {
    return favorites.cooks.includes(cookId);
  }, [favorites.cooks]);

  return {
    favorites,
    isLoading,
    toggleProductFavorite,
    toggleCookFavorite,
    isProductFavorite,
    isCookFavorite,
  };
}