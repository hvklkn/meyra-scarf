import { useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, ClipboardList, Image, LogOut } from 'lucide-react';

const AdminHeader = ({ active }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navItems = [
    { key: 'products', label: 'Ürünler',   icon: Package,      href: '/admin'          },
    { key: 'orders',   label: 'Siparişler', icon: ClipboardList, href: '/admin/orders'  },
    { key: 'settings', label: 'Görseller',  icon: Image,         href: '/admin/settings'},
  ];

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingBag size={22} className="text-amber-700" />
          <h1 className="text-lg font-semibold text-gray-800">Meyra Admin Paneli</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <LogOut size={16} />
          Çıkış Yap
        </button>
      </div>

      {/* Navigation tabs */}
      <nav className="px-6 flex gap-1 border-t">
        {navItems.map(({ key, label, icon: Icon, href }) => (
          <button
            key={key}
            onClick={() => navigate(href)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              active === key
                ? 'border-amber-700 text-amber-700'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default AdminHeader;
