var mongoose = require('mongoose');

var BukuSchema = new mongoose.Schema({
    id: String,
    nama_buku: String,
    jenis_buku: String,
    pengarang: String,
    harga: Number,
    updated_at: { type: Date, default: Date.now }
});

// jika modelnya Buku, akan tersimpan database bukus

module.exports = mongoose.model('Buku', BukuSchema);