import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';
import { initiatePayment } from '../services/paymentApi';

const EMPTY_FORM = {
  customerName: '', phone: '', email: '',
  address: '', city: '', district: '', postalCode: '',
  cardHolder: '', cardNumber: '', expiryMonth: '', expiryYear: '', cvv: '',
};

const Checkout = () => {
  const navigate  = useNavigate();
  const { items, clearCart } = useCart();
  const [form, setForm]       = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 flex flex-col items-center justify-center px-4">
        <p className="text-sand-600 mb-6 text-lg">Sepetiniz boş.</p>
        <Link to="/" className="btn-outline">Alışverişe Devam Et</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      customer: {
        customerName: form.customerName,
        phone       : form.phone,
        email       : form.email,
        address     : form.address,
        city        : form.city,
        district    : form.district,
        postalCode  : form.postalCode,
      },
      items: items.map((i) => ({
        id      : i.id,
        name    : i.name,
        price   : i.price,
        quantity: i.quantity,
      })),
      card: {
        cardHolder  : form.cardHolder,
        cardNumber  : form.cardNumber.replace(/\s/g, ''),
        expiryMonth : form.expiryMonth,
        expiryYear  : String(form.expiryYear),
        cvv         : form.cvv,
      },
    };

    try {
      const res = await initiatePayment(payload);
      clearCart();
      navigate(`/order-success?orderNumber=${res.data.orderNumber}`);
    } catch (err) {
      const msg = err.response?.data?.error || 'Ödeme işlemi başarısız oldu.';
      setError(msg);
      navigate(`/order-failed?reason=${encodeURIComponent(msg)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Top bar */}
      <header className="bg-white border-b py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link to="/" className="text-sand-500 hover:text-sand-800 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-serif text-xl text-sand-900">Sipariş Tamamla</h1>
            <p className="text-xs text-sand-500 tracking-wide uppercase">Güvenli Ödeme</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border p-6">
              <CheckoutForm
                form={form}
                onChange={setForm}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-6">
              <OrderSummary editable={true} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
