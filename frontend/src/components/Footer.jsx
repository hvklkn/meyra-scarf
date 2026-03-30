import { Instagram, CreditCard, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-sand-900 text-sand-300 pt-20 pb-10 border-t border-sand-800">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="col-span-1 lg:col-span-1 border-b md:border-b-0 border-sand-800 pb-10 md:pb-0">
            <a href="#" className="block mb-6">
              <h2 className="font-serif text-2xl tracking-widest text-white">MEYRA</h2>
              <span className="block font-script text-xs tracking-[0.3em] text-meyra-secondary mt-1">SCARF</span>
            </a>
            <p className="text-sm font-light leading-relaxed mb-6">
              Modern kadının şıklığını yansıtan, premium kalite kumaşlarla özel olarak tasarlanmış eşarp koleksiyonları.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/meyrascarf25" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-sand-700 flex items-center justify-center text-sand-300 hover:bg-meyra-primary hover:text-white hover:border-meyra-primary transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-white font-medium tracking-widest uppercase text-sm mb-6">Keşfet</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#products" className="hover:text-meyra-secondary transition-colors">Tüm Koleksiyon</a></li>
              <li><a href="#story" className="hover:text-meyra-secondary transition-colors">Hikayemiz</a></li>
              <li><a href="#" className="hover:text-meyra-secondary transition-colors">Yeni Gelenler</a></li>
              <li><a href="#" className="hover:text-meyra-secondary transition-colors">Çok Satanlar</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-white font-medium tracking-widest uppercase text-sm mb-6">Müşteri Hizmetleri</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#faq" className="hover:text-meyra-secondary transition-colors">Sıkça Sorulan Sorular</a></li>
              <li><a href="#" className="hover:text-meyra-secondary transition-colors">İade ve Değişim</a></li>
              <li><a href="#" className="hover:text-meyra-secondary transition-colors">Teslimat Bilgileri</a></li>
              <li><a href="#" className="hover:text-meyra-secondary transition-colors">Bize Ulaşın</a></li>
            </ul>
          </div>

          {/* Safety & Payment Col */}
          <div>
            <h4 className="text-white font-medium tracking-widest uppercase text-sm mb-6">Güvenli Alışveriş</h4>
            <p className="text-sm font-light leading-relaxed mb-6">
              256-bit SSL şifrelemesi ile güvenli ödeme altyapısı.
            </p>
            <div className="flex flex-col gap-3">
               <div className="flex items-center gap-3 text-sm">
                  <ShieldCheck size={20} className="text-meyra-secondary" />
                  <span>Güvenli Ödeme</span>
               </div>
               <div className="flex items-center gap-3 text-sm">
                  <CreditCard size={20} className="text-meyra-secondary" />
                  <span>Kredi Kartı / Banka Kartı</span>
               </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-sand-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-sand-500">
          <p>© {new Date().getFullYear()} Meyra Scarf. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-sand-300 transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-sand-300 transition-colors">Mesafeli Satış Sözleşmesi</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
