const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    hero: {
      image:       { type: String, default: '' },
      badge:       { type: String, default: '' },
      title1:      { type: String, default: '' },
      title2:      { type: String, default: '' },
      description: { type: String, default: '' },
    },
    brandStory: {
      image1:      { type: String, default: '' },
      image2:      { type: String, default: '' },
      founderName: { type: String, default: '' },
    },
    instagramGrid: {
      photos: [{ type: String }],
    },
    finalCta: {
      image: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
