let Eleve = require('../model/eleve');

// Récupérer liste des élèves (GET)

function getEleves(req, res){
    Eleve.find((err, eleves) => {
        if(err){
            res.send(err)
        }

        res.send(eleves);
    });
}

   
module.exports = { getEleves };
