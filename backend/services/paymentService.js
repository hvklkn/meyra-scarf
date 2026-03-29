/**
 * Payment Service — abstraction layer for payment providers.
 *
 * Replace processPayment() with the real provider SDK (iyzico, Stripe, PayTR, etc.).
 * The rest of the codebase (paymentController) never touches provider-specific code.
 */

// ────────────────────────────────────────────────────────────────────────────
// iyzico entegrasyonu için:
//   1. npm install iyzipay
//   2. backend/.env dosyasına IYZICO_API_KEY, IYZICO_SECRET_KEY, IYZICO_BASE_URL ekle
//   3. Aşağıdaki yorum satırlarını açıp mock bloğunu sil
// ────────────────────────────────────────────────────────────────────────────
//
// const Iyzipay = require('iyzipay');
// const iyzipay = new Iyzipay({
//   apiKey    : process.env.IYZICO_API_KEY,
//   secretKey : process.env.IYZICO_SECRET_KEY,
//   uri       : process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
// });
//
// const processPayment = ({ amount, orderId, card, customer }) => {
//   return new Promise((resolve) => {
//     const request = {
//       locale         : Iyzipay.LOCALE.TR,
//       conversationId : orderId,
//       price          : String(amount),
//       paidPrice      : String(amount),
//       currency       : Iyzipay.CURRENCY.TRY,
//       installment    : '1',
//       paymentChannel : Iyzipay.PAYMENT_CHANNEL.WEB,
//       paymentGroup   : Iyzipay.PAYMENT_GROUP.PRODUCT,
//       paymentCard: {
//         cardHolderName : card.cardHolder,
//         cardNumber     : card.cardNumber.replace(/\s/g, ''),
//         expireMonth    : card.expiryMonth,
//         expireYear     : card.expiryYear,
//         cvc            : card.cvv,
//         registerCard   : '0',
//       },
//       buyer: {
//         id          : orderId,
//         name        : customer?.customerName?.split(' ')[0] || 'Ad',
//         surname     : customer?.customerName?.split(' ')[1] || 'Soyad',
//         gsmNumber   : customer?.phone   || '+905000000000',
//         email       : customer?.email   || 'test@test.com',
//         identityNumber  : '74300864791', // TCKN — üretimde kullanıcıdan al
//         lastLoginDate   : new Date().toISOString().slice(0, 19).replace('T', ' '),
//         registrationDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
//         registrationAddress: customer?.address || 'Adres',
//         ip          : '85.34.78.112',
//         city        : customer?.city     || 'Istanbul',
//         country     : 'Turkey',
//         zipCode     : customer?.postalCode || '34000',
//       },
//       shippingAddress: {
//         contactName : customer?.customerName || 'Ad Soyad',
//         city        : customer?.city         || 'Istanbul',
//         country     : 'Turkey',
//         address     : customer?.address      || 'Adres',
//         zipCode     : customer?.postalCode   || '34000',
//       },
//       billingAddress: {
//         contactName : customer?.customerName || 'Ad Soyad',
//         city        : customer?.city         || 'Istanbul',
//         country     : 'Turkey',
//         address     : customer?.address      || 'Adres',
//         zipCode     : customer?.postalCode   || '34000',
//       },
//       basketItems: [
//         {
//           id        : orderId,
//           name      : 'Meyra Scarf Sipariş',
//           category1 : 'Aksesuar',
//           itemType  : Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
//           price     : String(amount),
//         },
//       ],
//     };
//
//     iyzipay.payment.create(request, (err, result) => {
//       if (err || result.status !== 'success') {
//         resolve({ success: false, errorMessage: result?.errorMessage || 'Ödeme başarısız.' });
//       } else {
//         resolve({ success: true, transactionId: result.paymentId });
//       }
//     });
//   });
// };

/**
 * @param {object} opts
 * @param {number}  opts.amount      - Amount in Turkish Lira (TL)
 * @param {string}  opts.orderId     - Internal order ID (for reference)
 * @param {object}  opts.card        - { cardHolder, cardNumber, expiryMonth, expiryYear, cvv }
 * @returns {Promise<{ success: boolean, transactionId?: string, errorMessage?: string }>}
 */
const processPayment = async ({ amount, orderId, card }) => {
  // ── MOCK IMPLEMENTATION ──────────────────────────────────────────────────
  // Gerçek entegrasyon için yukarıdaki iyzico bloğunu açın, bu bloğu silin.
  // ────────────────────────────────────────────────────────────────────────

  await new Promise((resolve) => setTimeout(resolve, 600));

  // TEST trigger: '0000' ile başlayan kartlar her zaman başarısız
  const cleanCard = card.cardNumber.replace(/\s/g, '');
  if (cleanCard.startsWith('0000')) {
    return { success: false, errorMessage: 'Kart reddedildi. Kart bilgilerini kontrol edin.' };
  }

  if (cleanCard.length < 16) {
    return { success: false, errorMessage: 'Geçersiz kart numarası.' };
  }

  return {
    success: true,
    transactionId: `TXN-${Date.now()}-${orderId.slice(-6)}`,
  };
};

module.exports = { processPayment };
