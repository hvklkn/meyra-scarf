import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const SHIPPING_FEE = 50;
const FREE_SHIPPING_THRESHOLD = 500;

const Cart = () => {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();
  const navigate = useNavigate();

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingFee;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-white border-b border-sand-200 sticky top-0 z-30">
        <div className="container mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sand-600 hover:text-meyra-primary transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            <span>Alışverişe Devam Et</span>
          </button>
          <a href="/" className="flex flex-col items-center">
            <span className="font-serif text-xl font-bold tracking-widest text-sand-900 leading-none">MEYRA</span>
            <span className="block font-script text-[10px] tracking-[0.3em] text-meyra-primary mt-0.5">SCARF</span>
          </a>
          <div className="w-32 text-right">
            <span className="text-sm text-sand-500">{itemCount} ürün</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 lg:px-12 py-10">
        <h1 className="font-serif text-3xl md:text-4xl text-sand-900 mb-8">Sepetim</h1>

        {/* Empty State */}
        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-24 h-24 rounded-full bg-sand-100 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={36} className="text-sand-400" />
            </div>
            <h2 className="font-serif text-2xl text-sand-700 mb-3">Sepetiniz boş</h2>
            <p className="text-sand-500 mb-8">Koleksiyonumuzu keşfederek sepetinize ürün ekleyebilirsiniz.</p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              <ShoppingBag size={16} />
              <span>Koleksiyonu Keşfet</span>
            </button>
          </motion.div>
        )}

        {/* Cart Content */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Items List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-sand-200 overflow-hidden">
                <AnimatePresence>
                  {items.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex gap-4 p-4 sm:p-6 ${idx < items.length - 1 ? 'border-b border-sand-100' : ''}`}
                    >
                      {/* Product Image */}
                      <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden bg-sand-100 shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag size={20} className="text-sand-400" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="font-serif text-sand-900 text-base sm:text-lg leading-tight truncate">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sand-400 hover:text-red-500 transition-colors shrink-0 p-1 -mt-1 -mr-1"
                            aria-label="Ürünü sil"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        {item.category && (
                          <p className="text-xs text-sand-400 uppercase tracking-wider mb-3">{item.category}</p>
                        )}
                        <div className="flex items-center justify-between mt-auto">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 border border-sand-200 rounded-full px-1.5 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-sand-100 transition-colors text-sand-600"
                              aria-label="Azalt"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-sm font-medium text-sand-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-sand-100 transition-colors text-sand-600"
                              aria-label="Artır"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          {/* Item Total */}
                          <div className="text-right">
                            <span className="font-medium text-sand-900 text-base">
                              ₺{(item.price * item.quantity).toFixed(2)}
                            </span>
                            {item.quantity > 1 && (
                              <p className="text-xs text-sand-400 mt-0.5">₺{item.price} / adet</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-sand-200 p-6 sticky top-24">
                <h2 className="font-serif text-xl text-sand-900 mb-6">Sipariş Özeti</h2>

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-sand-600">
                    <span>Ara Toplam ({itemCount} ürün)</span>
                    <span>₺{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sand-600">
                    <span>Kargo</span>
                    {shippingFee === 0 ? (
                      <span className="text-green-600 font-medium">Ücretsiz</span>
                    ) : (
                      <span>₺{shippingFee.toFixed(2)}</span>
                    )}
                  </div>
                  {shippingFee > 0 && (
                    <p className="text-xs text-meyra-primary">
                      ₺{(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} daha ekleyin, kargo ücretsiz!
                    </p>
                  )}
                </div>

                <div className="border-t border-sand-200 pt-4 mb-6">
                  <div className="flex justify-between font-medium text-sand-900">
                    <span className="text-base">Toplam</span>
                    <span className="text-xl font-serif">₺{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="btn-primary w-full justify-center"
                >
                  <span>Ödemeye Geç</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="mt-3 w-full text-center text-sm text-sand-500 hover:text-meyra-primary transition-colors py-2"
                >
                  Alışverişe Devam Et
                </button>

                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-sand-100">
                  <div className="flex flex-col gap-2 text-xs text-sand-400">
                    <div className="flex items-center gap-2">
                      <span>🔒</span>
                      <span>256-bit SSL ile güvenli ödeme</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🚚</span>
                      <span>₺{FREE_SHIPPING_THRESHOLD}'den alışverişte ücretsiz kargo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>↩️</span>
                      <span>14 gün koşulsuz iade</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
