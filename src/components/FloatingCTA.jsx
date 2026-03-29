import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : 100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="floating-cta fixed bottom-4 left-4 right-4 z-40 pointer-events-none md:hidden"
    >
      <div className="w-full max-w-md mx-auto pointer-events-auto">
        <a 
          href="#products"
          className="flex w-full items-center justify-center gap-2 bg-meyra-primary text-white py-4 px-6 rounded-full shadow-[0_10px_40px_-10px_rgba(181,147,107,0.8)] font-medium tracking-wider uppercase text-[13px] border border-meyra-secondary/50 active:scale-95 transition-transform"
        >
          <ShoppingBag size={18} />
          <span>Koleksiyonu Keşfet</span>
        </a>
      </div>
    </motion.div>
  );
};

export default FloatingCTA;
