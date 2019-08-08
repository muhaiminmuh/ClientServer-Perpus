var mongoose = require('mongoose');
var crypto = require('crypto');

var kode_aman = 'muhaimin.com';
var passwordTe = "pcc";
var passwordBaru = crypto.createHmac('sha256', kode_aman) .update(passwordTe).digest('hex');

console.log("Password Baru : " + passwordBaru);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bukudb', { useNewUrlParser: true });

var User = require('../models/User');

var adminBaru = {
    user: "admin",
    pass: passwordBaru,
};

User.create(adminBaru, function (err, data) {
    if (err) {
        console.log("Username " + adminBaru.user + " sudah ada");
    } else {
        console.log("Username " + adminBaru.user + " Berhasil dibuat");
    }
});


