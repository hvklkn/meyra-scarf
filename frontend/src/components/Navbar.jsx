import { useState, useEffect } from 'react';
import { Menu, X, Instagram, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and disable floating CTA when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Koleksiyon', href: '#products' },
    { name: 'Hakkımızda', href: '#story' },
    { name: 'S.S.S.', href: '#faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Mobile Menu Button - Left aligned on mobile */}
          <div className="flex-1 lg:hidden">
            <button 
              className="text-sand-800 p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Menüyü aç"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium tracking-wider text-sand-700 hover:text-meyra-primary transition-colors uppercase"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Logo - Centered absolutely relative to header */}
          <a href="#" className="absolute left-1/2 -translate-x-1/2 text-center flex flex-col items-center justify-center">
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-widest text-sand-900 leading-none">
              MEYRA
            </h1>
            <span className="block font-script text-[10px] md:text-xs tracking-[0.3em] text-meyra-primary mt-1">
              SCARF
            </span>
          </a>

          {/* Actions - Right aligned */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 flex-1">
            <a href="https://www.instagram.com/meyrascarf25" target="_blank" rel="noopener noreferrer" className="text-sand-700 hover:text-meyra-primary transition-colors hidden sm:flex items-center justify-center p-2">
              <Instagram size={20} />
            </a>
            {/* Cart button */}
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 text-sand-700 hover:text-meyra-primary transition-colors"
              aria-label="Sepet"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-meyra-primary text-white text-[10px] flex items-center justify-center font-medium">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Menu Overlay - Outside Header to avoid containing block bugs */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] h-[100dvh] w-full bg-cream-50 flex flex-col lg:hidden overflow-y-auto"
          >
            {/* Header Area inside menu */}
            <div className="flex justify-between items-center p-6 border-b border-sand-200 shrink-0">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-center flex flex-col items-center">
                <h2 className="font-serif text-xl font-bold tracking-widest text-sand-900 leading-none">MEYRA</h2>
              </a>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-sand-600 p-2 border border-sand-300 rounded-full hover:bg-sand-100 transition-colors"
                aria-label="Menüyü kapat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex flex-col items-center justify-center flex-grow gap-8 p-8 overflow-y-auto">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif font-medium tracking-widest text-sand-800 hover:text-meyra-primary transition-colors uppercase text-center w-full"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Footer Area inside menu */}
            <div className="p-8 border-t border-sand-200 mt-auto shrink-0 flex flex-col items-center gap-6">
              <a 
                href="https://www.instagram.com/meyrascarf25" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-sand-700 hover:text-meyra-primary transition-colors"
              >
                <Instagram size={24} />
                <span className="font-medium tracking-wider uppercase text-sm">Instagram'da Bizi Bulun</span>
              </a>
              <button
                onClick={() => { navigate('/cart'); setIsMobileMenuOpen(false); }}
                className="btn-primary w-full justify-center !py-4"
              >
                <ShoppingCart size={18} className="mr-2" />
                <span>Sepete Git{itemCount > 0 ? ` (${itemCount})` : ''}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
