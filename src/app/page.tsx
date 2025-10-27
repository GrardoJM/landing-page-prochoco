
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import ProductShowcase from '@/components/sections/product-showcase';
import About from '@/components/sections/about';
import Recipes from '@/components/sections/recipes';
import DiscountModalProvider from '@/components/ui/discount-modal-provider';
import Seals from '@/components/sections/seals';
import Stores from '@/components/sections/stores';
import { CartProvider } from '@/context/cart-context';

export default function Home() {
  return (
    <CartProvider>
      <DiscountModalProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <Header />
          <main className="flex-1">
            <Hero />
            <ProductShowcase />
            <About />
            <Seals />
            <Recipes />
            <Stores />
          </main>
          <Footer />
        </div>
      </DiscountModalProvider>
    </CartProvider>
  );
}
