import { useSearchParams, Link } from 'react-router-dom';
import { XCircle, RotateCcw } from 'lucide-react';

const OrderFailed = () => {
  const [params] = useSearchParams();
  const reason = params.get('reason') || 'Ödeme işlemi tamamlanamadı.';

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
            <XCircle size={40} className="text-red-500" />
          </div>
        </div>

        <h1 className="font-serif text-2xl text-sand-900 mb-2">
          Ödeme Başarısız
        </h1>
        <p className="text-sand-600 mt-1 text-sm">{reason}</p>

        <p className="text-sm text-sand-500 mt-4">
          Kart bilgilerinizi kontrol edip tekrar deneyebilirsiniz. Sorun devam ederse bankanızla iletişime geçin.
        </p>

        <div className="mt-8 space-y-3">
          <Link
            to="/checkout"
            className="flex items-center justify-center gap-2 w-full bg-meyra-primary text-white py-3 rounded-full text-sm font-medium hover:bg-sand-700 transition-colors"
          >
            <RotateCcw size={16} />
            Tekrar Dene
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center w-full border border-gray-300 text-gray-600 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderFailed;
