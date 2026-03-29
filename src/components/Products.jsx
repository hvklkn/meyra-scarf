import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ShoppingCart, Check } from 'lucide-react';
import { getProducts } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, index }) => {
  const { addItem } = useCart();
  const navigate    = useNavigate();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    addItem(product);
    navigate('/checkout');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-md bg-sand-200">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-sand-200 flex items-center justify-center">
            <span className="text-sand-400 text-sm">Görsel yok</span>
          </div>
        )}

        {/* Kategori badge */}
        {product.category && (
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur text-sand-900 text-[10px] uppercase tracking-widest py-1 px-3 rounded-sm font-medium">
              {product.category}
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-sand-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-5 gap-2">
          <button
            onClick={handleBuyNow}
            className="btn-primary !py-2.5 !px-5 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75"
          >
            <ShoppingBag size={15} />
            <span>Hemen Al</span>
          </button>
          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-white/90 backdrop-blur text-sand-900 text-xs font-medium rounded-full transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 hover:bg-white"
          >
            {added ? <Check size={13} className="text-green-600" /> : <ShoppingCart size={13} />}
            {added ? 'Sepete Eklendi' : 'Sepete Ekle'}
          </button>
        </div>
      </div>

      <div className="flex justify-between items-start gap-4 px-1">
        <div>
          <h3 className="font-serif text-xl text-sand-900 group-hover:text-meyra-primary transition-colors mb-1">
            {product.name}
          </h3>
        </div>
        <div className="text-right">
          <span className="block font-medium text-sand-900 text-lg tracking-wide">
            ₺{product.price}
          </span>
        </div>
      </div>
      <p className="text-sm text-sand-600 line-clamp-2 px-1 mt-1">{product.description}</p>
    </motion.div>
  );
};

const ProductSkeleton = () => (
  <div className="flex flex-col animate-pulse">
    <div className="aspect-[3/4] bg-sand-200 rounded-md mb-6" />
    <div className="h-5 bg-sand-200 rounded w-3/4 mb-2" />
    <div className="h-3 bg-sand-200 rounded w-1/2" />
  </div>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        setError('Ürünler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section id="products" className="py-24 bg-cream-50 relative">
      <div className="container mx-auto px-6 lg:px-12">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-meyra-primary text-sm tracking-[0.2em] uppercase font-medium mb-3 block">Koleksiyon</span>
          <h2 className="section-heading mb-4">Öne Çıkan Modeller</h2>
          <div className="gold-line mb-6"></div>
          <p className="text-sand-600">Her kombine zarafet katan, özel tasarım ve yüksek kalite kumaşlarla üretilen seçkin eşarp koleksiyonumuz.</p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-sand-500">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}



      </div>
    </section>
  );
};

export default Products;
