import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const FinalCTA = () => {
  const settings = useSettings();
  const bgImage   = settings.finalCta?.image || '';

  return (
    <section className="relative py-32 bg-sand-900 overflow-hidden text-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center mix-blend-luminosity"
        style={{ backgroundImage: bgImage ? `url('${bgImage}')` : undefined }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <span className="text-meyra-secondary text-xs sm:text-sm tracking-[0.3em] uppercase font-medium mb-6 block">Yeni Sezon</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream-50 leading-tight mb-6 px-2">
            Zarafeti Gardırobunuza <br/>
            <span className="italic font-script text-meyra-secondary">Davet Edin</span>
          </h2>
          <p className="text-sand-300 mb-10 text-base sm:text-lg font-light px-4">
            Sınırlı sayıda üretilen premium koleksiyonumuzu hemen keşfedin, tarzınızı Meyra Scarf ile tamamlayın.
          </p>
          
          <a href="#products" className="btn-primary w-full sm:w-auto justify-center !bg-white !text-sand-900 hover:!bg-meyra-secondary hover:!gap-3">
            <span>Koleksiyonu İncele</span>
            <ShoppingBag size={18} />
          </a>
        </motion.div>
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent to-meyra-primary/50"></div>
    </section>
  );
};

export default FinalCTA;
