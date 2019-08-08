var mongoose = require('mongoose');

var PembelianSchema = new mongoose.Schema({
    id_buku: String,
    id_supplier: String,
    jumlah: Number,
    total_harga: Number,
    update_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pembelian', PembelianSchema);

