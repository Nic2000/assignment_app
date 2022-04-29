let Prof = require('../model/prof');

// Récupérer liste des profs (GET)

function getProfs(req, res){
    Prof.find((err, profs) => {
        if(err){
            res.send(err)
        }
        res.send(profs);
    });
}
module.exports = { getProfs };
