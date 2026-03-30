const PAYMENT_LABELS = {
  pending : { label: 'Bekliyor',  color: 'bg-yellow-100 text-yellow-700' },
  paid    : { label: 'Ödendi',    color: 'bg-green-100  text-green-700'  },
  failed  : { label: 'Başarısız', color: 'bg-red-100    text-red-700'    },
  refunded: { label: 'İade',      color: 'bg-purple-100 text-purple-700' },
};

const ORDER_LABELS = {
  pending        : { label: 'Bekliyor',          color: 'bg-gray-100   text-gray-600'    },
  payment_pending: { label: 'Ödeme Bekleniyor',  color: 'bg-yellow-100 text-yellow-700'  },
  paid           : { label: 'Ödendi',            color: 'bg-blue-100   text-blue-700'    },
  preparing      : { label: 'Hazırlanıyor',      color: 'bg-indigo-100 text-indigo-700'  },
  shipped        : { label: 'Kargoya Verildi',   color: 'bg-amber-100  text-amber-700'   },
  delivered      : { label: 'Teslim Edildi',     color: 'bg-green-100  text-green-700'   },
  cancelled      : { label: 'İptal Edildi',      color: 'bg-red-100    text-red-700'     },
};

const CARGO_LABELS = {
  not_created: { label: 'Oluşturulmadı', color: 'bg-gray-100   text-gray-500'   },
  preparing  : { label: 'Hazırlanıyor',  color: 'bg-indigo-100 text-indigo-700' },
  shipped    : { label: 'Gönderildi',    color: 'bg-amber-100  text-amber-700'  },
  in_transit : { label: 'Yolda',         color: 'bg-blue-100   text-blue-700'   },
  delivered  : { label: 'Teslim Edildi', color: 'bg-green-100  text-green-700'  },
  returned   : { label: 'İade Edildi',   color: 'bg-purple-100 text-purple-700' },
};

const OrderStatusBadge = ({ type = 'order', status }) => {
  const map = type === 'payment' ? PAYMENT_LABELS
            : type === 'cargo'   ? CARGO_LABELS
            : ORDER_LABELS;

  const { label, color } = map[status] || { label: status, color: 'bg-gray-100 text-gray-600' };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
};

export default OrderStatusBadge;
