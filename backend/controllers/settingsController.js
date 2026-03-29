const Settings = require('../models/Settings');

// GET /api/settings — public
exports.getSettings = async (req, res) => {
  try {
    // Always return the single settings document; create defaults if not exists
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Ayarlar alınamadı' });
  }
};

// PUT /api/settings — admin auth required
exports.updateSettings = async (req, res) => {
  try {
    const body = req.body;
    const current = await Settings.findOne() || {};

    // Deep merge: sadece gönderilen alanları güncelle
    const patch = {
      hero:          { ...(current.hero         || {}), ...(body.hero          || {}) },
      brandStory:    { ...(current.brandStory   || {}), ...(body.brandStory    || {}) },
      instagramGrid: { ...(current.instagramGrid|| {}), ...(body.instagramGrid || {}) },
      finalCta:      { ...(current.finalCta     || {}), ...(body.finalCta      || {}) },
    };

    const updated = await Settings.findOneAndUpdate({}, patch, { new: true, upsert: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Ayarlar kaydedilemedi' });
  }
};
