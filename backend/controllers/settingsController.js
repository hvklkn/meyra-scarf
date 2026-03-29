const fs = require('fs');
const path = require('path');

const SETTINGS_FILE = path.join(__dirname, '../data/siteSettings.json');

const readSettings = () => {
  const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
  return JSON.parse(data);
};

const writeSettings = (settings) => {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
};

// GET /api/settings — public
exports.getSettings = (req, res) => {
  try {
    const settings = readSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Ayarlar alınamadı' });
  }
};

// PUT /api/settings — admin auth required
exports.updateSettings = (req, res) => {
  try {
    const current = readSettings();
    const body = req.body;

    // Deep merge: sadece gönderilen alanları güncelle
    const updated = {
      hero:           { ...current.hero,           ...(body.hero           || {}) },
      brandStory:     { ...current.brandStory,     ...(body.brandStory     || {}) },
      instagramGrid:  { ...current.instagramGrid,  ...(body.instagramGrid  || {}) },
      finalCta:       { ...current.finalCta,       ...(body.finalCta       || {}) },
    };

    writeSettings(updated);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Ayarlar kaydedilemedi' });
  }
};
