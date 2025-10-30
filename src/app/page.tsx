
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
import Reviews from '@/components/sections/reviews';
import ProductCarousel from '@/components/sections/product-carousel';
import Statistics from '@/components/sections/statistics';
import WhyUs from '@/components/sections/why-us';

export default function Home() {
  return (
    <CartProvider>
      <DiscountModalProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <Header />
          <main className="flex-1">
            <Hero />
            <ProductShowcase />
            {/* <Statistics /> */}
            <WhyUs />
            <About />
            <Seals />
            <ProductCarousel />
            <Recipes />
            <Reviews />
            <Stores />
          </main>
          <Footer />
        </div>
      </DiscountModalProvider>
    </CartProvider>
  );
}
