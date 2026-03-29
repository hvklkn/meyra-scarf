const Product = require('../models/Product');

// GET /api/products - public, yalnızca aktif ürünleri döner
exports.getAll = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Ürünler alınamadı' });
  }
};

// GET /api/admin/products - admin, tüm ürünleri döner (pasifler dahil)
exports.getAllAdmin = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Ürünler alınamadı' });
  }
};

// GET /api/products/:id
exports.getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Ürün bulunamadı' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Ürün alınamadı' });
  }
};

// POST /api/products
exports.create = async (req, res) => {
  try {
    const { name, price, description, image, category, stock, isActive } = req.body;

    if (!name || price === undefined || price === '') {
      return res.status(400).json({ error: 'Ad ve fiyat alanları zorunludur' });
    }

    const product = await Product.create({
      name,
      price: Number(price),
      description: description || '',
      image: image || '',
      category: category || '',
      stock: Number(stock) || 0,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Ürün oluşturulamadı' });
  }
};

// PUT /api/products/:id
exports.update = async (req, res) => {
  try {
    const patch = { ...req.body };
    if (patch.price !== undefined) patch.price = Number(patch.price);
    if (patch.stock !== undefined) patch.stock = Number(patch.stock);
    if (patch.isActive !== undefined) patch.isActive = Boolean(patch.isActive);

    const product = await Product.findByIdAndUpdate(req.params.id, patch, { new: true });
    if (!product) return res.status(404).json({ error: 'Ürün bulunamadı' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Ürün güncellenemedi' });
  }
};

// DELETE /api/products/:id
exports.remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Ürün bulunamadı' });
    res.json({ message: 'Ürün başarıyla silindi' });
  } catch (err) {
    res.status(500).json({ error: 'Ürün silinemedi' });
  }
};
