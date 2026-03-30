import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '../data/testimonials';

const Testimonials = () => {
  return (
    <section className="py-24 bg-cream-100 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-blush/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-meyra-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-meyra-primary text-sm tracking-[0.2em] uppercase font-medium mb-3 block">Müşteri Yorumları</span>
          <h2 className="section-heading mb-4">Mutlu Müşterilerimiz</h2>
          <div className="gold-line mb-6"></div>
          <p className="text-sand-600">Meyra Scarf kalitesini deneyimleyen 1000'den fazla mutlu müşterimizden bazılarının yorumları.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/50 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4 text-meyra-primary">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-sand-700 font-light leading-relaxed mb-6 text-sm italic">
                "{item.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-sand-200 shrink-0">
                  <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div>
                  <h4 className="text-sand-900 font-medium text-sm">{item.name}</h4>
                  <span className="text-sand-500 text-xs">{item.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
