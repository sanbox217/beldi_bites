import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, Package, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cartService } from '@/services/cartService';
import { useState, useEffect } from 'react';

const navItems = [
  { path: '/', icon: Home, key: 'home' },
  { path: '/search', icon: Search, key: 'search' },
  { path: '/cart', icon: ShoppingCart, key: 'cart' },
  { path: '/orders', icon: Package, key: 'orders' },
  { path: '/profile', icon: User, key: 'profile' },
];

export function BottomNav() {
  const { t } = useTranslation();
  const location = useLocation();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const updateCartCount = async () => {
      const cart = await cartService.getCart();
      setCartItemCount(cart.items.reduce((total, item) => total + item.qty, 0));
    };

    updateCartCount();
    
    // Listen for cart changes
    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-elegant">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ path, icon: Icon, key }) => {
          const isActive = location.pathname === path;
          
          return (
            <NavLink
              key={path}
              to={path}
              className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors min-w-0 ${
                isActive 
                  ? 'text-primary bg-primary-soft' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {key === 'cart' && cartItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium truncate max-w-full">
                {t(`nav.${key}`)}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}