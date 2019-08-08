var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Buku = require('../models/Buku');
var Transaksi = require('../models/Transaksi');

var token = require('../token');

// Deklarasi fonts
var fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf',
    }
};

var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

router.get('/', token.cek, function (req, res, next) {
    Transaksi.find(function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});


router.put('/', token.cek, function (req, res, next) {
    Transaksi.create(req.body, function (err, data) {
        if (err) return next(err);
        res.json({
            "status": true,
            "pesan": "Berhasil Ditambah",
            "data": data
        });
    });
});


/* POST users listing. Menambah Data */
router.post('/', token.cek, function (req, res, next) {
    var id = req.body._id;
    Transaksi.findByIdAndUpdate(id, req.body, function (err, data) {
        if (err) return next(err);
        res.json({
            "status": true,
            "pesan": "Berhasil Diubah",
            "data": data
        });
    });
});

router.delete('/', token.cek, function(req, res, next) {

    var id = req.body._id;
    Transaksi.findByIdAndRemove(id, req.body, function (err, data) {
        if (err) return next(err);
        res.json({
            "status":"berhasil",
            "pesan":"Berhasil Hapus",
            "data":data
        });
    });

});

/* GET PDF */
router.get('/pdf', function (req, res, next) {
    Transaksi.find(function (err, data) {
        if (err) return next(err);

        var dataTampil = new Array();
        dataTampil.push(
            Array("Nama Pelanggan", "ID Buku", "Jumlah", "Total Harga")
        );

        data.forEach(function (item) {
            dataTampil.push(
                Array(item.nama_pelanggan, item.id_buku, item.jumlah, item.total_harga)
            );
        });


        var docDefinition = {
            header: 'Laporan Transaksi Penjualan',
            content: [{
                layout: 'lightHorizontalLinks',
                table: {
                    headerRows: 1,
                    width: ['*', '*'],
                    body: dataTampil
                },
            },
            { qr: 'https://muhaiminmuh.github.io' }
            ]
        };

        var options = {
            // ....
        }

        var pdfDOc = printer.createPdfKitDocument(docDefinition, options);
        pdfDOc.pipe(fs.createWriteStream('pdf/lap_transaksi_penjualan.pdf'));
        pdfDOc.end();

        var filestream = fs.createReadStream('pdf/lap_transaksi_penjualan.pdf');
        filestream.pipe(res);

    });
});

module.exports = router;