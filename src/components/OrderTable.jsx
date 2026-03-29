import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';

const OrderTable = ({ orders }) => {
  const navigate = useNavigate();

  if (!orders.length) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">Henüz sipariş yok.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="text-left px-4 py-3 font-medium text-gray-600">Sipariş No</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Müşteri</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Tarih</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Toplam</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Ödeme</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Sipariş</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Kargo</th>
            <th className="text-right px-4 py-3 font-medium text-gray-600">Detay</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-mono font-medium text-gray-800">{order.orderNumber}</td>
              <td className="px-4 py-3">
                <div className="font-medium text-gray-800">{order.customerName}</div>
                <div className="text-gray-400 text-xs">{order.email}</div>
              </td>
              <td className="px-4 py-3 text-gray-600 text-xs">
                {new Date(order.createdAt).toLocaleDateString('tr-TR', {
                  day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
                })}
              </td>
              <td className="px-4 py-3 font-medium text-gray-800">₺{order.total}</td>
              <td className="px-4 py-3"><OrderStatusBadge type="payment" status={order.paymentStatus} /></td>
              <td className="px-4 py-3"><OrderStatusBadge type="order"   status={order.orderStatus}   /></td>
              <td className="px-4 py-3"><OrderStatusBadge type="cargo"   status={order.cargoStatus}   /></td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => navigate(`/admin/orders/${order.id}`)}
                  className="p-1.5 text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                  title="Detayı Görüntüle"
                >
                  <Eye size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
