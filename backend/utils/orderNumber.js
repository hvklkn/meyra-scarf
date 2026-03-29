const generateOrderNumber = () => {
  const now = new Date();
  const year  = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day   = String(now.getDate()).padStart(2, '0');
  const rand  = Math.floor(Math.random() * 99999).toString().padStart(5, '0');
  return `MYR${year}${month}${day}${rand}`;
};

module.exports = { generateOrderNumber };
