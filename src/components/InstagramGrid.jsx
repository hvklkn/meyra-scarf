import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const InstagramGrid = () => {
  const settings = useSettings();
  const posts = settings.instagramGrid?.photos?.length
    ? settings.instagramGrid.photos
    : [
        'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=600&q=80',
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
        'https://images.unsplash.com/photo-1584850937402-23ccbbfc6cd3?w=600&q=80',
        'https://images.unsplash.com/photo-1595183353597-d867c2957953?w=600&q=80',
        'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80',
        'https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=600&q=80',
      ];

  return (
    <section className="py-24 bg-cream-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <a href="https://www.instagram.com/meyrascarf25" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-3 rounded-full bg-white text-meyra-primary shadow-lg mb-6 hover:scale-110 transition-transform">
            <Instagram size={32} />
          </a>
          <h2 className="section-heading mb-4">Instagram'da Biz</h2>
          <p className="font-script text-xl text-sand-500 mb-2">@meyrascarf25</p>
          <p className="text-sand-600">Tarzını Meyra Scarf ile tamamlayanlar arasına sen de katıl. Bizi takip et, kombin ilhamlarını kaçırma.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {posts.map((img, idx) => (
            <motion.a 
              key={idx}
              href="https://www.instagram.com/meyrascarf25" 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative aspect-square overflow-hidden group block"
            >
              <img 
                src={img} 
                alt="Instagram post" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-sand-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram size={28} className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="https://www.instagram.com/meyrascarf25" target="_blank" rel="noopener noreferrer" className="btn-outline">
            Tüm Paylaşımları Gör
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramGrid;
