import { Pencil, Trash2 } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  if (!products.length) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">Henüz ürün eklenmedi.</p>
        <p className="text-sm mt-1">Yeni ürün eklemek için yukarıdaki butonu kullanın.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="text-left px-4 py-3 font-medium text-gray-600">Görsel</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Ürün Adı</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Kategori</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Fiyat</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Stok</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Durum</th>
            <th className="text-right px-4 py-3 font-medium text-gray-600">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Yok</span>
                  </div>
                )}
              </td>
              <td className="px-4 py-3 font-medium text-gray-800">{product.name}</td>
              <td className="px-4 py-3 text-gray-600">{product.category || '—'}</td>
              <td className="px-4 py-3 text-gray-800 font-medium">₺{product.price}</td>
              <td className="px-4 py-3 text-gray-600">{product.stock ?? '—'}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {product.isActive ? 'Aktif' : 'Pasif'}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-1.5 text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                    title="Düzenle"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Sil"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
