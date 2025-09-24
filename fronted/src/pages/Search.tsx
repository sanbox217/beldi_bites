import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchBar } from '@/components/home/SearchBar';
import { CategoryPills } from '@/components/home/CategoryPills';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { catalogService } from '@/services/catalogService';
import { Product, Cook, Category } from '@/types';
import moroccanFoods from '@/assets/moroccan-foods.jpg';

export default function Search() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cooks, setCooks] = useState<Cook[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      const categoriesResult = await catalogService.getCategories();
      setCategories(categoriesResult);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadResults = async () => {
      if (!searchQuery && !selectedCategory) {
        setProducts([]);
        setHasSearched(false);
        return;
      }

      setLoading(true);
      setHasSearched(true);
      
      try {
        const [productsResult, allCooks] = await Promise.all([
          catalogService.listProducts({
            query: searchQuery || undefined,
            category: selectedCategory || undefined,
            page: 1,
            limit: 50
          }),
          catalogService.listCooks()
        ]);

        setProducts(productsResult.products);
        setCooks(allCooks);
      } catch (error) {
        console.error('Failed to search:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadResults, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  const getCookForProduct = (cookId: string) => {
    return cooks.find(cook => cook.id === cookId);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-14 z-40 bg-background/95 backdrop-blur border-b">
        <div className="p-4 space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <CategoryPills
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>
      </div>

      <div className="p-4">
        {!hasSearched ? (
          <div className="text-center py-12 space-y-6">
            <img 
              src={moroccanFoods} 
              alt="Search illustration" 
              className="w-48 h-32 object-cover rounded-2xl mx-auto opacity-50"
            />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">
                {isArabic ? 'ابحث عن أطباقك المفضلة' : 'Recherchez vos plats préférés'}
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                {isArabic 
                  ? 'اكتشف مئات الأطباق المغربية الأصيلة من طباخات ماهرات في منطقتك'
                  : 'Découvrez des centaines de plats marocains authentiques préparés par des cuisinières talentueuses de votre région'
                }
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                {isArabic ? 'جرب البحث عن:' : 'Essayez de rechercher:'}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['مسمن', 'حرشة', 'بغرير', 'كراشل'].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(term)}
                    className="rounded-full"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-muted rounded-2xl mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-foreground">
              {isArabic ? 'لم يتم العثور على نتائج' : 'Aucun résultat trouvé'}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              {isArabic 
                ? 'جرب البحث بكلمات مختلفة أو تصفح الفئات المتاحة'
                : 'Essayez de rechercher avec des mots différents ou parcourez les catégories disponibles'
              }
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
            >
              {isArabic ? 'مسح البحث' : 'Effacer la recherche'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {isArabic ? 'نتائج البحث' : 'Résultats de recherche'}
              </h2>
              <span className="text-sm text-muted-foreground">
                {products.length} {isArabic ? 'منتج' : 'produits'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  cook={getCookForProduct(product.cookId)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}