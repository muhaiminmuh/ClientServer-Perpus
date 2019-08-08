var mongoose = require('mongoose');

var SupplierSchema = new mongoose.Schema({
    id: String,
    nama_supplier: String,
    alamat: String,
    updated_at: { type: Date, default: Date.now }
});

// jika modelnya Buku, akan tersimpan database bukus

module.exports = mongoose.model('Supplier', SupplierSchema);