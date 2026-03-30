import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft, ExternalLink } from 'lucide-react';
import { trackOrder } from '../services/orderApi';
import OrderStatusBadge from '../components/OrderStatusBadge';

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [contact, setContact]         = useState('');
  const [order, setOrder]             = useState(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setOrder(null);

    if (!orderNumber.trim() || !contact.trim()) {
      setError('Sipariş numarası ve e-posta/telefon gereklidir.');
      return;
    }

    setLoading(true);
    try {
      const contactObj = contact.includes('@')
        ? { email: contact.trim() }
        : { phone: contact.trim() };

      const res = await trackOrder(orderNumber.trim(), contactObj);
      setOrder(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Sipariş bulunamadı. Bilgileri kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="bg-white border-b py-4 px-6">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link to="/" className="text-sand-500 hover:text-sand-800 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-serif text-xl text-sand-900">Sipariş Takip</h1>
            <p className="text-xs text-sand-500 tracking-wide uppercase">Kargo &amp; Sipariş Durumu</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Search form */}
        <div className="bg-white rounded-xl border p-6 mb-6">
          <h2 className="font-medium text-gray-800 mb-4">Siparişinizi Sorgulayın</h2>
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sipariş Numarası
              </label>
              <input
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="MYR2603290001"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-posta veya Telefon
              </label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="ornek@email.com veya 05XX XXX XX XX"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-meyra-primary text-white py-3 rounded-full text-sm font-medium hover:bg-sand-700 disabled:opacity-50 transition-colors"
            >
              <Search size={16} />
              {loading ? 'Aranıyor...' : 'Siparişi Sorgula'}
            </button>
          </form>
        </div>

        {/* Order result */}
        {order && (
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <p className="font-mono font-semibold text-gray-800">{order.orderNumber}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString('tr-TR', {
                      day: '2-digit', month: 'long', year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <OrderStatusBadge type="payment" status={order.paymentStatus} />
                  <OrderStatusBadge type="order"   status={order.orderStatus}   />
                </div>
              </div>
            </div>

            {/* Cargo info */}
            <div className="px-6 py-4 border-b">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Kargo Bilgileri</h3>
              {order.cargoStatus === 'not_created' ? (
                <p className="text-sm text-gray-400">Henüz kargoya verilmedi.</p>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Kargo Firması</span>
                    <span className="font-medium text-gray-800">{order.cargoCompany || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Takip Numarası</span>
                    <span className="font-medium text-gray-800 font-mono">{order.trackingNumber || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-500">Kargo Durumu</span>
                    <OrderStatusBadge type="cargo" status={order.cargoStatus} />
                  </div>
                  {order.cargoTrackingUrl && (
                    <a
                      href={order.cargoTrackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-amber-700 hover:underline mt-2"
                    >
                      <ExternalLink size={13} />
                      Kargo firmasında takip et
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Items */}
            <div className="px-6 py-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Ürünler</h3>
              <ul className="space-y-2">
                {order.items.map((item, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.productName} <span className="text-gray-400">x{item.quantity}</span>
                    </span>
                    <span className="font-medium text-gray-800">₺{item.subtotal}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t flex justify-between font-semibold text-sm text-gray-800">
                <span>Toplam (kargo dahil)</span>
                <span>₺{order.total}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderTracking;
