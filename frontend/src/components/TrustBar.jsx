import { ShieldCheck, Truck, RotateCcw, HeartHandshake } from 'lucide-react';

const TrustBar = () => {
  const features = [
    {
      icon: <ShieldCheck size={28} className="text-meyra-primary" />,
      title: 'Güvenli Alışveriş',
      desc: 'Güvenli ödeme sistemi'
    },
    {
      icon: <Truck size={28} className="text-meyra-primary" />,
      title: 'Hızlı Teslimat',
      desc: 'Türkiye\'nin her yerine'
    },
    {
      icon: <RotateCcw size={28} className="text-meyra-primary" />,
      title: 'Kolay İade',
      desc: '14 gün içinde değişim'
    },
    {
      icon: <HeartHandshake size={28} className="text-meyra-primary" />,
      title: '%100 Müşteri Memnuniyeti',
      desc: 'Mutlu müşterilerimiz arasına katılın'
    }
  ];

  return (
    <div className="bg-sand-900 border-y border-sand-800 py-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-sand-800/50 mix-blend-screen text-meyra-primary">
                {feature.icon}
              </div>
              <h3 className="font-medium text-cream-100 tracking-wide text-sm">{feature.title}</h3>
              <p className="text-sand-400 text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
