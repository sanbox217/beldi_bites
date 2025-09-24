import { useTranslation } from 'react-i18next';
import { MapPin, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export function TopBar() {
  const { t } = useTranslation();

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            درب السلطان، الدار البيضاء
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-accent-warm rounded-full"></span>
          </Button>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}