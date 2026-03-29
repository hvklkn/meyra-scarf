const EMPTY = {
  // Delivery
  customerName: '',
  phone       : '',
  email       : '',
  address     : '',
  city        : '',
  district    : '',
  postalCode  : '',
  // Payment
  cardHolder  : '',
  cardNumber  : '',
  expiryMonth : '',
  expiryYear  : '',
  cvv         : '',
};

const inputClass =
  'w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent';

const CheckoutForm = ({ form, onChange, onSubmit, loading }) => {
  const handleChange = (e) => {
    let { name, value } = e.target;
    // Auto-format card number: groups of 4
    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    }
    if (name === 'cvv') value = value.replace(/\D/g, '').slice(0, 4);
    onChange({ ...form, [name]: value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* ── Teslimat Bilgileri ─────────────────────────────────────────── */}
      <section>
        <h3 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b">
          Teslimat Bilgileri
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad <span className="text-red-500">*</span>
              </label>
              <input name="customerName" value={form.customerName} onChange={handleChange}
                required placeholder="Ayşe Kaya" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon <span className="text-red-500">*</span>
              </label>
              <input name="phone" value={form.phone} onChange={handleChange}
                required placeholder="05XX XXX XX XX" type="tel" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-posta <span className="text-red-500">*</span>
            </label>
            <input name="email" value={form.email} onChange={handleChange}
              required type="email" placeholder="ornek@email.com" className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adres <span className="text-red-500">*</span>
            </label>
            <textarea name="address" value={form.address} onChange={handleChange}
              required rows={2} placeholder="Sokak, mahalle, bina/daire"
              className={`${inputClass} resize-none`} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Şehir <span className="text-red-500">*</span>
              </label>
              <input name="city" value={form.city} onChange={handleChange}
                required placeholder="İstanbul" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">İlçe</label>
              <input name="district" value={form.district} onChange={handleChange}
                placeholder="Kadıköy" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Posta Kodu</label>
              <input name="postalCode" value={form.postalCode} onChange={handleChange}
                placeholder="34700" className={inputClass} maxLength={5} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Ödeme Bilgileri ─────────────────────────────────────────────── */}
      <section>
        <h3 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b">
          Ödeme Bilgileri
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kart Sahibinin Adı <span className="text-red-500">*</span>
            </label>
            <input name="cardHolder" value={form.cardHolder} onChange={handleChange}
              required placeholder="AYŞE KAYA" className={`${inputClass} uppercase`} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kart Numarası <span className="text-red-500">*</span>
            </label>
            <input name="cardNumber" value={form.cardNumber} onChange={handleChange}
              required placeholder="0000 0000 0000 0000" inputMode="numeric"
              className={`${inputClass} tracking-widest`} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ay <span className="text-red-500">*</span>
              </label>
              <select name="expiryMonth" value={form.expiryMonth} onChange={handleChange}
                required className={`${inputClass} bg-white`}>
                <option value="">Ay</option>
                {Array.from({ length: 12 }, (_, i) => {
                  const m = String(i + 1).padStart(2, '0');
                  return <option key={m} value={m}>{m}</option>;
                })}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yıl <span className="text-red-500">*</span>
              </label>
              <select name="expiryYear" value={form.expiryYear} onChange={handleChange}
                required className={`${inputClass} bg-white`}>
                <option value="">Yıl</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const yr = new Date().getFullYear() + i;
                  return <option key={yr} value={yr}>{yr}</option>;
                })}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV <span className="text-red-500">*</span>
              </label>
              <input name="cvv" value={form.cvv} onChange={handleChange}
                required placeholder="123" inputMode="numeric"
                className={inputClass} maxLength={4} />
            </div>
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-meyra-primary text-white py-4 rounded-full font-medium tracking-wider uppercase text-sm hover:bg-sand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'İşleniyor...' : 'Siparişi Onayla ve Öde'}
      </button>
    </form>
  );
};

export default CheckoutForm;
