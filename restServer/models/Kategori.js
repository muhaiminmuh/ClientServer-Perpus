var mongoose = require('mongoose');

var KategoriSchema = new mongoose.Schema({
    id: String,
    kategori: String,
    updated_at: { type: Date, default: Date.now }
});

// jika modelnya Buku, akan tersimpan database bukus

module.exports = mongoose.model('Kategori', KategoriSchema);