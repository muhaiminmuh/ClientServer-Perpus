var mongoose = require('mongoose');

var PengarangSchema = new mongoose.Schema({
    id: String,
    nama_pengarang: String,
    alamat: String,
    updated_at: { type: Date, default: Date.now }
});

// jika modelnya Buku, akan tersimpan database bukus

module.exports = mongoose.model('Pengarang', PengarangSchema);