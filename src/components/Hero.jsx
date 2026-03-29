import { motion } from 'framer-motion';
import { Instagram, ShoppingBag } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Hero = () => {
  const settings = useSettings();
  const heroImage = settings.hero?.image || '';
  const badge     = settings.hero?.badge || 'Yeni Sezon Koleksiyonu';
  const title1    = settings.hero?.title1 || 'Zarafeti';
  const title2    = settings.hero?.title2 || 'Hisset';
  const description = settings.hero?.description || '';

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-cream-100">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full md:w-2/3 h-full overflow-hidden">
        <motion.div 
           initial={{ opacity: 0, scale: 1.1 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           style={{ backgroundImage: heroImage ? `url('${heroImage}')` : undefined }}
           className="absolute inset-0 bg-cover bg-center origin-center"
        />
        {/* Soft fading gradient to blend with left area */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream-100 via-cream-100/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream-100 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center">
        
        <div className="w-full md:w-1/2 pt-10 md:pt-0 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 border border-meyra-secondary rounded-full text-meyra-primary text-xs tracking-[0.2em] uppercase mb-6 font-medium">
              {badge}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl text-sand-900 leading-[1.1] mb-6"
          >
            {title1} <br/>
            <span className="text-gradient italic font-script">{title2}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-sand-600 mb-10 font-light leading-relaxed max-w-md"
          >
            {description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full"
          >
            <a href="#products" className="btn-primary w-full sm:w-auto justify-center group py-4 sm:py-5 text-sm sm:text-base">
              <span>Koleksiyonu Keşfet</span>
              <ShoppingBag size={18} className="group-hover:-translate-y-1 transition-transform" />
            </a>
            <a href="https://www.instagram.com/meyrascarf25" target="_blank" rel="noopener noreferrer" className="btn-outline w-full sm:w-auto justify-center group py-4 sm:py-5 text-sm sm:text-base">
              <Instagram size={18} />
              <span>Instagram</span>
            </a>
          </motion.div>
        </div>

      </div>

      {/* Floating abstract elements */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 sm:bottom-20 left-4 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-meyra-secondary/30 blur-[2px] hidden sm:block"
      />
      <motion.div 
        animate={{ y: [0, 30, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-20 sm:top-40 right-10 sm:right-1/3 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-rose-blush/20 blur-3xl"
      />

    </section>
  );
};

export default Hero;
