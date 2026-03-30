import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';

const OrderSuccess = () => {
  const [params] = useSearchParams();
  const orderNumber = params.get('orderNumber');

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle size={40} className="text-green-500" />
          </div>
        </div>

        <h1 className="font-serif text-2xl text-sand-900 mb-2">
          Siparişiniz Alındı!
        </h1>
        <p className="text-sand-600 mb-1">
          Ödemeniz başarıyla gerçekleşti.
        </p>
        {orderNumber && (
          <p className="text-sm text-sand-500 mt-1 font-mono">
            Sipariş No: <span className="font-semibold text-meyra-primary">{orderNumber}</span>
          </p>
        )}

        <p className="text-sm text-sand-500 mt-4">
          Sipariş durumunuzu takip etmek için sipariş numaranızı saklayın.
        </p>

        <div className="mt-8 space-y-3">
          {orderNumber && (
            <Link
              to={`/order-tracking`}
              className="flex items-center justify-center gap-2 w-full border border-meyra-primary text-meyra-primary py-3 rounded-full text-sm font-medium hover:bg-meyra-primary hover:text-white transition-colors"
            >
              <Package size={16} />
              Siparişimi Takip Et
            </Link>
          )}
          <Link
            to="/"
            className="flex items-center justify-center w-full bg-meyra-primary text-white py-3 rounded-full text-sm font-medium hover:bg-sand-700 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
