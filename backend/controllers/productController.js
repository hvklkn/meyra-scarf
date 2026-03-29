const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '../data/products.json');

const readProducts = () => {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
};

const writeProducts = (products) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8');
};

// GET /api/products - public, yalnızca aktif ürünleri döner
exports.getAll = (req, res) => {
  try {
    const products = readProducts();
    res.json(products.filter((p) => p.isActive));
  } catch (err) {
    res.status(500).json({ error: 'Ürünler alınamadı' });
  }
};

// GET /api/admin/products - admin, tüm ürünleri döner (pasifler dahil)
exports.getAllAdmin = (req, res) => {
  try {
    const products = readProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Ürünler alınamadı' });
  }
};

// GET /api/products/:id
exports.getById = (req, res) => {
  try {
    const products = readProducts();
    const product = products.find((p) => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: 'Ürün bulunamadı' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Ürün alınamadı' });
  }
};

// POST /api/products
exports.create = (req, res) => {
  try {
    const { name, price, description, image, category, stock, isActive } = req.body;

    if (!name || price === undefined || price === '') {
      return res.status(400).json({ error: 'Ad ve fiyat alanları zorunludur' });
    }

    const products = readProducts();
    const newProduct = {
      id: uuidv4(),
      name,
      price: Number(price),
      description: description || '',
      image: image || '',
      category: category || '',
      stock: Number(stock) || 0,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    };

    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Ürün oluşturulamadı' });
  }
};

// PUT /api/products/:id
exports.update = (req, res) => {
  try {
    const products = readProducts();
    const index = products.findIndex((p) => p.id === req.params.id);

    if (index === -1) return res.status(404).json({ error: 'Ürün bulunamadı' });

    const updated = {
      ...products[index],
      ...req.body,
      id: req.params.id,
      price: req.body.price !== undefined ? Number(req.body.price) : products[index].price,
      stock: req.body.stock !== undefined ? Number(req.body.stock) : products[index].stock,
      isActive:
        req.body.isActive !== undefined ? Boolean(req.body.isActive) : products[index].isActive,
    };

    products[index] = updated;
    writeProducts(products);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Ürün güncellenemedi' });
  }
};

// DELETE /api/products/:id
exports.remove = (req, res) => {
  try {
    const products = readProducts();
    const index = products.findIndex((p) => p.id === req.params.id);

    if (index === -1) return res.status(404).json({ error: 'Ürün bulunamadı' });

    products.splice(index, 1);
    writeProducts(products);
    res.json({ message: 'Ürün başarıyla silindi' });
  } catch (err) {
    res.status(500).json({ error: 'Ürün silinemedi' });
  }
};
