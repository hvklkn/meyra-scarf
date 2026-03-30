import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/api';
import AdminHeader from '../components/AdminHeader';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';

const Admin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getAdminProducts();
      setProducts(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/admin/login');
      } else {
        setError('Ürünler yüklenemedi. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchProducts();
  }, []);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      setFormOpen(false);
      await fetchProducts();
    } catch (err) {
      alert(err.response?.data?.error || 'İşlem başarısız. Lütfen tekrar deneyin.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;
    try {
      await deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      alert(err.response?.data?.error || 'Silme işlemi başarısız.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader active="products" />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Sayfa Başlığı */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Ürün Yönetimi</h2>
            {!loading && (
              <p className="text-sm text-gray-500 mt-0.5">Toplam {products.length} ürün</p>
            )}
          </div>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-amber-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-800 transition-colors shadow-sm"
          >
            <Plus size={16} />
            Yeni Ürün
          </button>
        </div>

        {/* Hata mesajı */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Ürün Tablosu */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {loading ? (
            <div className="p-8 space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ProductTable
              products={products}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>

      {/* Ürün Formu Modal */}
      {formOpen && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onClose={() => setFormOpen(false)}
        />
      )}
    </div>
  );
};

export default Admin;
