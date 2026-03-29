import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, RefreshCw, Image, CheckCircle, AlertCircle } from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import { getSettings, updateSettings } from '../services/settingsApi';

// ─── Small helpers ───────────────────────────────────────────────────────────

const ImageInput = ({ label, value, onChange, hint }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type="url"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="https://..."
      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
    />
    {hint && <p className="text-xs text-gray-400">{hint}</p>}
    {value && (
      <div className="relative w-full h-32 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
        <img
          src={value}
          alt={label}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 -z-10">
          <Image size={24} className="text-gray-300" />
        </div>
      </div>
    )}
  </div>
);

const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
      <h2 className="font-semibold text-gray-800 text-base">{title}</h2>
    </div>
    <div className="p-6 flex flex-col gap-5">{children}</div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const AdminSettings = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [message, setMessage]   = useState(null); // { type: 'success'|'error', text }

  // Load settings on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) { navigate('/admin/login'); return; }

    getSettings()
      .then((res) => setForm(res.data))
      .catch(() => setMessage({ type: 'error', text: 'Ayarlar yüklenemedi.' }))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await updateSettings(form);
      setMessage({ type: 'success', text: 'Değişiklikler kaydedildi. Sayfa yenilenince görünür hale gelir.' });
    } catch {
      setMessage({ type: 'error', text: 'Kaydetme sırasında hata oluştu.' });
    } finally {
      setSaving(false);
    }
  };

  const setHero = (field, val) =>
    setForm((f) => ({ ...f, hero: { ...f.hero, [field]: val } }));

  const setBrandStory = (field, val) =>
    setForm((f) => ({ ...f, brandStory: { ...f.brandStory, [field]: val } }));

  const setGridPhoto = (idx, val) => {
    const photos = [...(form.instagramGrid?.photos || [])];
    photos[idx] = val;
    setForm((f) => ({ ...f, instagramGrid: { ...f.instagramGrid, photos } }));
  };

  const setFinalCta = (val) =>
    setForm((f) => ({ ...f, finalCta: { ...f.finalCta, image: val } }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader active="settings" />
        <div className="flex items-center justify-center h-64">
          <RefreshCw size={20} className="animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader active="settings" />

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Page title + Save button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Site Görsel Yönetimi</h1>
            <p className="text-sm text-gray-500 mt-0.5">Sitedeki tüm fotoğrafların URL'lerini buradan değiştirin.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
          >
            {saving ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
            {saving ? 'Kaydediliyor…' : 'Değişiklikleri Kaydet'}
          </button>
        </div>

        {/* Feedback message */}
        {message && (
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-6 text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.type === 'success'
              ? <CheckCircle size={16} />
              : <AlertCircle size={16} />}
            {message.text}
          </div>
        )}

        <div className="flex flex-col gap-6">

          {/* ── Hero Section ── */}
          <SectionCard title="Ana Sayfa Hero Bölümü">
            <ImageInput
              label="Hero Arka Plan Fotoğrafı"
              value={form.hero?.image || ''}
              onChange={(v) => setHero('image', v)}
              hint="Tavsiye boyut: en az 1600×900px. Fotoğrafın URL'sini yapıştırın."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Rozet Yazısı</label>
                <input
                  type="text"
                  value={form.hero?.badge || ''}
                  onChange={(e) => setHero('badge', e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Başlık — Satır 1</label>
                <input
                  type="text"
                  value={form.hero?.title1 || ''}
                  onChange={(e) => setHero('title1', e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Başlık — Satır 2 (italik)</label>
                <input
                  type="text"
                  value={form.hero?.title2 || ''}
                  onChange={(e) => setHero('title2', e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Alt Açıklama</label>
              <textarea
                rows={2}
                value={form.hero?.description || ''}
                onChange={(e) => setHero('description', e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              />
            </div>
          </SectionCard>

          {/* ── Brand Story ── */}
          <SectionCard title="Hikayemiz Bölümü — Fotoğraflar">
            <ImageInput
              label="Sol / Büyük Fotoğraf"
              value={form.brandStory?.image1 || ''}
              onChange={(v) => setBrandStory('image1', v)}
              hint="Dikey ağırlıklı fotoğraf önerilir (3:4 oran)."
            />
            <ImageInput
              label="Sağ / Üst Üste Fotoğraf"
              value={form.brandStory?.image2 || ''}
              onChange={(v) => setBrandStory('image2', v)}
              hint="Kare veya dikey fotoğraf önerilir."
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Kurucu İsim / İmza Etiketi</label>
              <input
                type="text"
                value={form.brandStory?.founderName || ''}
                onChange={(e) => setBrandStory('founderName', e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </SectionCard>

          {/* ── Instagram Grid ── */}
          <SectionCard title="Instagram Grid Fotoğrafları (6 adet)">
            <p className="text-xs text-gray-400 -mt-2">Kare formatında fotoğraflar önerilir (600×600px).</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(form.instagramGrid?.photos || Array(6).fill('')).map((photo, idx) => (
                <ImageInput
                  key={idx}
                  label={`Fotoğraf ${idx + 1}`}
                  value={photo}
                  onChange={(v) => setGridPhoto(idx, v)}
                />
              ))}
            </div>
          </SectionCard>

          {/* ── Final CTA ── */}
          <SectionCard title="Alt CTA Bölümü — Arka Plan">
            <ImageInput
              label="CTA Arka Plan Fotoğrafı"
              value={form.finalCta?.image || ''}
              onChange={(v) => setFinalCta(v)}
              hint="Koyu arka planlı fotoğraf önerilir (karanlık ton). Üzerine overlay uygulanır."
            />
          </SectionCard>

        </div>

        {/* Bottom save button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-60"
          >
            {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Kaydediliyor…' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
