import { useState, useEffect } from 'react';

const CARGO_STATUSES = [
  { value: 'not_created', label: 'Oluşturulmadı' },
  { value: 'preparing',   label: 'Hazırlanıyor'  },
  { value: 'shipped',     label: 'Gönderildi'    },
  { value: 'in_transit',  label: 'Yolda'         },
  { value: 'delivered',   label: 'Teslim Edildi' },
  { value: 'returned',    label: 'İade Edildi'   },
];

const CargoForm = ({ order, onSubmit }) => {
  const [form, setForm] = useState({
    cargoCompany    : '',
    trackingNumber  : '',
    cargoTrackingUrl: '',
    cargoStatus     : 'not_created',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (order) {
      setForm({
        cargoCompany    : order.cargoCompany     || '',
        trackingNumber  : order.trackingNumber   || '',
        cargoTrackingUrl: order.cargoTrackingUrl || '',
        cargoStatus     : order.cargoStatus      || 'not_created',
      });
    }
  }, [order]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kargo Firması</label>
          <input
            name="cargoCompany"
            value={form.cargoCompany}
            onChange={handleChange}
            placeholder="Yurtiçi, Aras, MNG..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Takip Numarası</label>
          <input
            name="trackingNumber"
            value={form.trackingNumber}
            onChange={handleChange}
            placeholder="12345678901"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Takip Linki</label>
        <input
          name="cargoTrackingUrl"
          value={form.cargoTrackingUrl}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kargo Durumu</label>
        <select
          name="cargoStatus"
          value={form.cargoStatus}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
        >
          {CARGO_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-amber-700 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-amber-800 disabled:opacity-50 transition-colors"
      >
        {saving ? 'Kaydediliyor...' : 'Kargo Bilgilerini Kaydet'}
      </button>
    </form>
  );
};

export default CargoForm;
