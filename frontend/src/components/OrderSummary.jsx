import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const SHIPPING_FEE = 50;

const OrderSummary = ({ editable = true }) => {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const total = subtotal + SHIPPING_FEE;

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-6 text-center text-gray-400">
        <p>Sepetiniz boş.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <div className="px-5 py-4 border-b">
        <h3 className="font-semibold text-gray-800">Sipariş Özeti</h3>
      </div>

      <ul className="divide-y">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 px-5 py-3">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
              <p className="text-sm text-meyra-primary font-medium">₺{item.price}</p>
            </div>
            {editable ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded hover:bg-gray-100 text-gray-500"
                >
                  <Minus size={13} />
                </button>
                <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded hover:bg-gray-100 text-gray-500"
                >
                  <Plus size={13} />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 rounded hover:bg-red-50 text-red-400 ml-1"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ) : (
              <span className="text-sm text-gray-500">x{item.quantity}</span>
            )}
          </li>
        ))}
      </ul>

      <div className="px-5 py-4 bg-gray-50 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Ara toplam</span>
          <span>₺{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Kargo</span>
          <span>₺{SHIPPING_FEE}</span>
        </div>
        <div className="flex justify-between font-semibold text-gray-800 pt-2 border-t">
          <span>Toplam</span>
          <span>₺{total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
