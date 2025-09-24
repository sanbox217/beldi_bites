import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFiltersClick?: () => void;
}

export function SearchBar({ value, onChange, onFiltersClick }: SearchBarProps) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(value);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, onChange]);

  return (
    <div className="flex gap-2 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t('home.searchPlaceholder')}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-10 h-12 bg-background/50 border shadow-soft"
        />
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onFiltersClick}
        className="px-3 h-12 border shadow-soft"
      >
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
}