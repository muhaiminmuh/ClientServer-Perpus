var express = require('express');
var router = express.Router();

var crypto = require('crypto');
var User = require('../models/User');
var wis_login = require('../middleware/auth');
var kode_aman = 'muhaimin.com';
var gudang_session;

var token = require("../token");
var jwt = require("jsonwebtoken");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


/* GET home page. */
router.get('/', wis_login, function(req, res, next) {
  gudang_session = req.session;
  res.render('index', { title: 'Express' });
});


  router.post('/login', function(req, res, next) {
    gudang_session = req.session;
    var passwordTe = req.body.pass;
    var passwordDiTerima = crypto.createHmac('sha256', kode_aman)
                              .update(passwordTe).digest('hex');

  User.find({ user: req.body.user, pass:passwordDiTerima}, function(err, data) {
    if (err) throw err;

    if (data.length > 0) {
      gudang_session.data_login = data[0];
      gudang_session.sudah_login = true;
      
      var token = jwt.sign( { data_login: data[0] }, 'kodekeamanan', (err, token) => {
          res.json({
            "status": true,
            "pesan": "Berhasil Login",
            "token": token
          });
      });     

      } else {
          res.json({
            "status": false,
            "pesan": "Username atau password salah",
          });
      
      }

    });

});


router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      res.json({
        "status": false,
        "pesan": "Gagal Logout",
      });
    
      var token = jwt.sign({ data_login: data[0] }, 'kodekeamanan', (err, token) => { 
              res.json({ 
                       "status": true, 
                        "pesan": "Berhasil login", 
                        "token": token 
               }); 
      }); 

    } else {
      res.json({
        "status": true,
        "pesan": "Berhasil Logout",
      });
    }
  
  });

});

module.exports = router;
