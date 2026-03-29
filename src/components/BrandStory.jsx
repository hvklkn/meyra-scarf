import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

const BrandStory = () => {
  const settings = useSettings();
  const image1      = settings.brandStory?.image1      || '';
  const image2      = settings.brandStory?.image2      || '';
  const founderName = settings.brandStory?.founderName || 'Kurucu, Meyra';

  return (
    <section id="story" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-cream-50 rounded-l-full -mr-[10%] opacity-50 block hidden md:block" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center gap-16 lg:gap-24">
        
        {/* Images grid */}
        <div className="w-full md:w-1/2 relative h-[350px] sm:h-[450px] md:h-[600px] mt-10 md:mt-0">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-0 w-2/3 h-3/4 bg-sand-200 rounded-lg overflow-hidden"
          >
            <img 
              src={image1}
              alt="Meyra Scarf Fabric Details" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-0 right-0 w-1/2 h-2/3 bg-sand-300 rounded-lg overflow-hidden border-8 border-white shadow-xl"
          >
            <img 
              src={image2}
              alt="Meyra Scarf Elegance" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-meyra-primary text-sm tracking-[0.2em] uppercase font-medium mb-3 block">Hikayemiz</span>
            <h2 className="section-heading mb-6">Zarafetin Dokunuşu</h2>
            
            <div className="flex flex-col gap-6 text-sand-600 leading-relaxed font-light">
              <p>
                Meyra Scarf olarak yolculuğumuz, modern kadının şıklığını ve rahatlığını bir araya getiren tasarımlar sunma hayaliyle başladı. Her bir eşarp, özenle seçilmiş ipliklerden dokunan premium kumaşlarla hayat buluyor.
              </p>
              <p>
                Renk paletimizden kumaş dokumuza kadar her detayda doğallığı ve zarafeti ön planda tutuyoruz. Sadece bir aksesuar değil, tarzınızın en güçlü parçasını tasarlıyoruz.
              </p>
              <p className="font-script text-2xl text-sand-800 italic mt-4">
                "Her kadının dolabında, ona kendini özel hissettiren bir Meyra olmalı."
              </p>
            </div>

            <div className="mt-10">
              <img src="/logo-signature.png" alt="" className="h-12 opacity-0" /> {/* Placeholder for signature if needed */}
              <p className="font-serif font-bold tracking-widest text-sand-900 border-l-2 border-meyra-primary pl-4">{founderName}</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default BrandStory;
