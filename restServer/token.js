var jwt = require('jsonwebtoken');

module.exports.cek = function(req, res, next) {
    var bearerHeader = req.headers["authorization"]

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ")
        const bearerToken =bearer[1]
        jwt.verify(bearerToken, 'kodekeamanan', (err, result) => {
            if (err) {
                res.sendStatus (401);
            } else {
                next(); 
            }
        });
    } else { 
        res.sendStatus(401); 
    }
} 