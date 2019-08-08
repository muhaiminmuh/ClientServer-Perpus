var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Pengarang = require('../models/Pengarang');

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


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bukudb', { useNewUrlParser: true })
    .then(() => console.log('Koneksi Berhasil'))
    .catch((err) => console.error(err));

/* GET users listing. Tampil Data */
router.get('/', token.cek, function (req, res, next) {
    Pengarang.find(function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});


/* PUT users listing. Menambah Data */
router.put('/', token.cek, function (req, res, next) {
    Pengarang.create(req.body, function (err, data) {
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
    Pengarang.findByIdAndUpdate(id, req.body, function (err, data) {
        if (err) return next(err);
        res.json({
            "status": true,
            "pesan": "Berhasil Diubah",
            "data": data
        });
    });
});


/* DEL users listing. Menambah Data */
router.delete('/', token.cek, function (req, res, next) {
    var id = req.body._id;
    Pengarang.findByIdAndRemove(id, req.body, function (err, data) {
        if (err) return next(err);
        res.json({
            "status": true,
            "pesan": "Berhasil Dihapus",
            "data": data
        });
    });
});


/* GET PDF */
router.get('/pdf', function (req, res, next) {
    Pengarang.find(function (err, data) {
        if (err) return next(err);

        var dataTampil = new Array();
        dataTampil.push(
            Array("ID", "Nama Pengarang", "Alamat")
        );

        data.forEach(function (item) {
            dataTampil.push(
                Array(item.id, item.nama_pengarang, item.alamat)
            );
        });


        var docDefinition = {
            header: 'Laporan Master Pengarang',
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
        pdfDOc.pipe(fs.createWriteStream('pdf/lap_pengarang.pdf'));
        pdfDOc.end();

        var filestream = fs.createReadStream('pdf/lap_pengarang.pdf');
        filestream.pipe(res);

    });
});

router.get('/combo', function (req, res, next) {

    Pengarang.find(function (err, data) {
        if (err) return next(err);

        var pilihan = new Array();
        data.forEach((item) => {

            pilihan.push(
                { id: item.nama_pengarang, value: item.nama_pengarang }
            )
        });
        res.json(pilihan);
    });
});

// diexport menjadi modul router, yg nnt dpt dipanggil
module.exports = router;
