import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getAdminOrderById, updateOrderStatus, updateOrderCargo } from '../services/orderApi';
import AdminHeader from '../components/AdminHeader';
import OrderStatusBadge from '../components/OrderStatusBadge';
import CargoForm from '../components/CargoForm';

const ORDER_STATUSES = [
  { value: 'payment_pending', label: 'Ödeme Bekleniyor' },
  { value: 'paid',            label: 'Ödendi'           },
  { value: 'preparing',       label: 'Hazırlanıyor'     },
  { value: 'shipped',         label: 'Kargoya Verildi'  },
  { value: 'delivered',       label: 'Teslim Edildi'    },
  { value: 'cancelled',       label: 'İptal Edildi'     },
];

const PAYMENT_STATUSES = [
  { value: 'pending',  label: 'Bekliyor'    },
  { value: 'paid',     label: 'Ödendi'      },
  { value: 'failed',   label: 'Başarısız'   },
  { value: 'refunded', label: 'İade Edildi' },
];

const AdminOrderDetail = () => {
  const navigate = useNavigate();
  const { id }   = useParams();

  const [order,   setOrder]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [saving,  setSaving]  = useState(false);

  // Status form state
  const [orderStatus,   setOrderStatus]   = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) { navigate('/admin/login'); return; }
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getAdminOrderById(id);
      setOrder(res.data);
      setOrderStatus(res.data.orderStatus);
      setPaymentStatus(res.data.paymentStatus);
    } catch (err) {
      if (err.response?.status === 401) navigate('/admin/login');
      else setError('Sipariş yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusSave = async () => {
    setSaving(true);
    try {
      const res = await updateOrderStatus(id, { orderStatus, paymentStatus });
      setOrder(res.data);
      alert('Durum güncellendi.');
    } catch (err) {
      alert(err.response?.data?.error || 'Güncelleme başarısız.');
    } finally {
      setSaving(false);
    }
  };

  const handleCargoSave = async (cargoData) => {
    const res = await updateOrderCargo(id, cargoData);
    setOrder(res.data);
    alert('Kargo bilgileri kaydedildi.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader active="orders" />
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-4 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader active="orders" />
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader active="orders" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Back + title */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/admin/orders" className="text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Sipariş Detayı — <span className="font-mono">{order.orderNumber}</span>
            </h2>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString('tr-TR', {
                day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ── Müşteri Bilgileri ──────────────────────────────────────── */}
          <div className="bg-white rounded-xl border p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Müşteri Bilgileri</h3>
            <dl className="space-y-2 text-sm">
              {[
                ['Ad Soyad',    order.customerName],
                ['Telefon',     order.phone],
                ['E-posta',     order.email],
                ['Adres',       order.address],
                ['Şehir',       `${order.city}${order.district ? ` / ${order.district}` : ''}`],
                ['Posta Kodu',  order.postalCode],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-2">
                  <dt className="text-gray-400 w-24 flex-shrink-0">{label}</dt>
                  <dd className="text-gray-800">{value || '—'}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Ürünler & Tutar ─────────────────────────────────────────── */}
          <div className="bg-white rounded-xl border p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Ürünler</h3>
            <ul className="space-y-2 mb-4">
              {order.items.map((item, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.productName} <span className="text-gray-400">x{item.quantity}</span>
                  </span>
                  <span className="font-medium">₺{item.subtotal}</span>
                </li>
              ))}
            </ul>
            <div className="border-t pt-2 space-y-1 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Ara toplam</span><span>₺{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Kargo</span><span>₺{order.shippingFee}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-800">
                <span>Toplam</span><span>₺{order.total}</span>
              </div>
            </div>
          </div>

          {/* ── Sipariş & Ödeme Durumu ───────────────────────────────────── */}
          <div className="bg-white rounded-xl border p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Sipariş Durumu</h3>
            <div className="flex gap-3 mb-4 flex-wrap text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Sipariş:</span>
                <OrderStatusBadge type="order" status={order.orderStatus} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Ödeme:</span>
                <OrderStatusBadge type="payment" status={order.paymentStatus} />
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sipariş Durumu</label>
                <select
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ödeme Durumu</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {PAYMENT_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleStatusSave}
                disabled={saving}
                className="w-full bg-amber-700 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-amber-800 disabled:opacity-50 transition-colors"
              >
                {saving ? 'Kaydediliyor...' : 'Durumu Güncelle'}
              </button>
            </div>
          </div>

          {/* ── Kargo Bilgileri ──────────────────────────────────────────── */}
          <div className="bg-white rounded-xl border p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Kargo Bilgileri</h3>
            <CargoForm order={order} onSubmit={handleCargoSave} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminOrderDetail;
