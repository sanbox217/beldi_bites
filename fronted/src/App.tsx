import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { TopBar } from "./components/layout/TopBar";
import { BottomNav } from "./components/layout/BottomNav";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Import i18n after other imports to avoid initialization issues
import './i18n';

const queryClient = new QueryClient();

// Layout component that wraps router-dependent components
const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
};

const App = () => {
  useEffect(() => {
    // Set initial language direction
    const savedLang = localStorage.getItem('i18nextLng') || 'ar';
    document.documentElement.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', savedLang);
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
