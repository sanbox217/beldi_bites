import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Truck, MapPin } from 'lucide-react';
import { SearchBar } from '@/components/home/SearchBar';
import { CategoryPills } from '@/components/home/CategoryPills';
import { ProductCard } from '@/components/product/ProductCard';
import { CookCard } from '@/components/cook/CookCard';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ProductGridSkeleton, FeaturedSectionSkeleton } from '@/components/ui/skeleton-loaders';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { catalogService } from '@/services/catalogService';
import { Product, Cook, Category } from '@/types';
import heroKitchen from '@/assets/hero-kitchen.jpg';
import moroccanFoods from '@/assets/moroccan-foods.jpg';

export default function Home() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [cooks, setCooks] = useState<Cook[]>([]);
  const [featuredCooks, setFeaturedCooks] = useState<Cook[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [
          productsResult,
          allCooks,
          featuredCooksResult,
          categoriesResult
        ] = await Promise.all([
          catalogService.listProducts({
            query: searchQuery || undefined,
            category: selectedCategory || undefined,
            page: 1,
            limit: 20
          }),
          catalogService.listCooks(),
          catalogService.getFeaturedCooks(),
          catalogService.getCategories()
        ]);

        setProducts(productsResult.products);
        setCooks(allCooks);
        setFeaturedCooks(featuredCooksResult);
        setCategories(categoriesResult);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [searchQuery, selectedCategory]);

  const getCookForProduct = (cookId: string) => {
    return cooks.find(cook => cook.id === cookId);
  };

  if (loading) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-background pb-20">
          <div className="space-y-6 p-4">
            <div className="h-48 w-full rounded-2xl animate-shimmer" />
            <div className="h-12 w-full animate-shimmer rounded-xl" />
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 w-20 rounded-full animate-shimmer" />
              ))}
            </div>
            <FeaturedSectionSkeleton />
            <ProductGridSkeleton />
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pattern-zellige opacity-50"></div>
          <div 
            className="relative h-64 bg-gradient-hero flex items-center justify-center text-center text-white"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(15, 107, 87, 0.9), rgba(204, 90, 54, 0.8)), url(${heroKitchen})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="max-w-md px-6 space-y-4 animate-fade-up">
              <h1 className="text-3xl font-bold text-balance">
                {t('home.title')}
              </h1>
              <p className="text-lg opacity-90 text-balance">
                {t('home.subtitle')}
              </p>
            </div>
          </div>
        </section>

      <div className="px-4 space-y-6 -mt-8 relative z-10">
        {/* Search & Location */}
        <div className="bg-card rounded-2xl p-4 shadow-elegant space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>درب السلطان</span>
            </div>
            
            <div className="flex rounded-lg border p-1">
              <Button
                variant={deliveryMode === 'delivery' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDeliveryMode('delivery')}
                className="text-xs"
              >
                <Truck className="h-3 w-3 mr-1" />
                {t('home.delivery')}
              </Button>
              <Button
                variant={deliveryMode === 'pickup' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDeliveryMode('pickup')}
                className="text-xs"
              >
                {t('home.pickup')}
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <CategoryPills
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>

        {/* Featured Cooks */}
        {featuredCooks.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              {t('home.featuredCooks')}
            </h2>
            <ScrollArea className="w-full">
              <div className="flex gap-4 pb-2">
                {featuredCooks.map((cook) => (
                  <div key={cook.id} className="w-72 flex-shrink-0">
                    <CookCard cook={cook} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>
        )}

        {/* Product Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">
              {selectedCategory ? 
                categories.find(c => c.id === selectedCategory)?.[isArabic ? 'nameAr' : 'nameFr'] 
                : (isArabic ? 'جميع الأطباق' : 'Tous les plats')
              }
            </h2>
            <span className="text-sm text-muted-foreground">
              {products.length} {isArabic ? 'منتج' : 'produits'}
            </span>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <img 
                src={moroccanFoods} 
                alt="No products" 
                className="w-48 h-32 object-cover rounded-2xl mx-auto opacity-50"
              />
              <p className="text-muted-foreground">
                {isArabic ? 'لا توجد منتجات متاحة' : 'Aucun produit disponible'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  cook={getCookForProduct(product.cookId)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
    </ErrorBoundary>
  );
}