
var wis_login = function (req, res, next) {

    if (!req.session.sudah_login) {
        res.status(401);
        return res.json({
            "status":false,
            "pesan":"Belum Login",
        });
    }

    next();
};

module.exports = wis_login;