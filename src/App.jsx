import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { SettingsProvider } from './context/SettingsContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Products from './components/Products';
import BrandStory from './components/BrandStory';
import Testimonials from './components/Testimonials';
import InstagramGrid from './components/InstagramGrid';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import AdminOrders from './pages/AdminOrders';
import AdminOrderDetail from './pages/AdminOrderDetail';
import AdminSettings from './pages/AdminSettings';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderFailed from './pages/OrderFailed';
import OrderTracking from './pages/OrderTracking';

const HomePage = () => (
  <div className="min-h-screen w-full flex flex-col antialiased selection:bg-meyra-secondary selection:text-white overflow-x-hidden">
    {/* Global Grain Texture Overlay */}
    <div className="fixed inset-0 pointer-events-none grain-overlay z-50"></div>

    <Navbar />

    <main className="flex-grow">
      <Hero />
      <TrustBar />
      <Products />
      <BrandStory />
      <Testimonials />
      <InstagramGrid />
      <FAQ />
      <FinalCTA />
    </main>

    <Footer />
    <FloatingCTA />
  </div>
);

function App() {
  return (
    <SettingsProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/"                   element={<HomePage />}        />
          <Route path="/cart"               element={<Cart />}            />
          <Route path="/checkout"           element={<Checkout />}        />
          <Route path="/order-success"      element={<OrderSuccess />}    />
          <Route path="/order-failed"       element={<OrderFailed />}     />
          <Route path="/order-tracking"     element={<OrderTracking />}   />
          <Route path="/admin/login"        element={<AdminLogin />}      />
          <Route path="/admin"              element={<Admin />}           />
          <Route path="/admin/orders"       element={<AdminOrders />}     />
          <Route path="/admin/orders/:id"   element={<AdminOrderDetail />}/>
          <Route path="/admin/settings"     element={<AdminSettings />}  />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </SettingsProvider>
  );
}

export default App;
