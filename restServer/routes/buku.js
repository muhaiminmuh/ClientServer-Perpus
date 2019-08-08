var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Buku = require('../models/Buku');

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
mongoose.connect ('mongodb://localhost/bukudb', {useNewUrlParser: true})
    .then ( () => console.log('Koneksi Berhasil'))
    .catch((err) => console.error(err));

/* GET users listing. Tampil Data */
router.get('/', token.cek, function (req, res, next) {
    Buku.find(function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});


/* PUT users listing. Menambah Data */
router.put('/', token.cek, function (req, res, next) {
    Buku.create(req.body, function (err, data) {
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
    Buku.findByIdAndUpdate(id, req.body, function (err, data) {
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
    Buku.findByIdAndRemove(id, req.body, function (err, data) {
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
    Buku.find(function (err, data) {
        if (err) return next(err);

        var dataTampil = new Array();
        dataTampil.push(
            Array("ID", "Nama Buku", "Jenis Buku", "Pengarang", "Harga")
        );

        data.forEach(function(item){
            dataTampil.push(
                Array(item.id, item.nama_buku, item.jenis_buku, item.pengarang, item.harga)
            );
        });


        var docDefinition = {
            header: 'Laporan Master',
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
        pdfDOc.pipe(fs.createWriteStream('pdf/lap_buku.pdf'));
        pdfDOc.end();

        var filestream = fs.createReadStream('pdf/lap_buku.pdf');
        filestream.pipe(res);

    });
});


// GET COMBO

router.get('/combo', function (req, res, next) {

    Buku.find(function (err, data) {
        if (err) return next(err);

        var pilihan = new Array();
        data.forEach((item) => {

            pilihan.push(
                { id: item.id, value: item.nama_buku +"  - Rp.  "+ item.harga }
            )
        });
        res.json(pilihan);
    });
});

// diexport menjadi modul router, yg nnt dpt dipanggil
module.exports = router;
