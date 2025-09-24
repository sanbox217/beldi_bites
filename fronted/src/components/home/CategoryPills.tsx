import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Category } from '@/types';
import { 
  Wheat, Circle, Sun, Layers, Cake, ChefHat, Leaf, Check
} from 'lucide-react';

const iconMap = {
  Wheat, Circle, Sun, Layers, Cake, ChefHat, Leaf, Check
};

interface CategoryPillsProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export function CategoryPills({ categories, selectedCategory, onCategorySelect }: CategoryPillsProps) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const getCategoryName = (category: Category) => {
    if (isArabic) return category.nameAr;
    if (i18n.language === 'fr') return category.nameFr;
    return category.nameEn;
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
  };

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 pb-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => onCategorySelect(null)}
          className={`flex-shrink-0 ${
            selectedCategory === null 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-primary-soft'
          }`}
        >
          {isArabic ? 'الكل' : 'Tout'}
        </Button>
        
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <Button
              key={category.id}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onCategorySelect(category.id)}
              className={`flex-shrink-0 gap-2 ${
                isSelected 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-primary-soft'
              }`}
            >
              {getIcon(category.icon)}
              <span className="whitespace-nowrap">
                {getCategoryName(category)}
              </span>
            </Button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}