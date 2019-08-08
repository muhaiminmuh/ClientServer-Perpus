var mongoose = require('mongoose');

var TransaksiSchema = new mongoose.Schema({
    nama_pelanggan: String,
    id_buku: String,
    jumlah: Number,
    total_harga: Number,
    update_at: { type: Date, default: Date.now},
});

module.exports = mongoose.model('Transaksi', TransaksiSchema);

