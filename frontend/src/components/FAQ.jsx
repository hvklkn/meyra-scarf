import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: "Siparişim kaç günde kargoya verilir?",
    answer: "Siparişleriniz genellikle 1-3 iş günü içerisinde özenle paketlenip kargoya teslim edilmektedir. Kampanya ve yoğunluk dönemlerinde bu süre 5 iş gününe kadar uzayabilir."
  },
  {
    question: "Hangi kargo şirketiyle çalışıyorsunuz?",
    answer: "Tüm Türkiye geneli gönderimlerimizde MNG / Yurtiçi Kargo (veya kullandığınız kargo şirketi) ile çalışmaktayız."
  },
  {
    question: "Ödeme seçenekleri nelerdir?",
    answer: "SSL şifrelemeli güvenli ödeme altyapımız üzerinden kredi kartı veya banka kartınızla güvenle (256-bit SSL) ödeme yapabilirsiniz. Tamamen güvenli bir alışveriş deneyimi sunuyoruz."
  },
  {
    question: "İade ve değişim yapabilir miyim?",
    answer: "Kullanılmamış, etiketi ve ambalajı zarar görmemiş ürünleri teslim aldığınız tarihten itibaren 14 gün içerisinde iade edebilir veya değiştirebilirsiniz. Satın alırken detaylı iade koşullarımızı inceleyebilirsiniz."
  },
  {
    question: "Yurtdışına gönderim yapıyor musunuz?",
    answer: "Şu an için sadece Türkiye geneline gönderim yapmaktayız. Gelecekte yurtdışı kargo seçeneklerimiz de eklenecektir."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // İlk soru açık gelsin

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-meyra-primary text-sm tracking-[0.2em] uppercase font-medium mb-3 block">Bilinmesi Gerekenler</span>
          <h2 className="section-heading mb-4">Sıkça Sorulan Sorular</h2>
          <div className="gold-line"></div>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`border rounded-xl transition-colors duration-300 ${isOpen ? 'border-meyra-primary bg-cream-50/50' : 'border-sand-200'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <span className={`font-medium ${isOpen ? 'text-meyra-primary' : 'text-sand-800'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`text-sand-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-meyra-primary' : ''}`} 
                    size={20} 
                  />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-sand-600 font-light leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
