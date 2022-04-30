let User = require('../model/user');

// Récupérer liste des utilisateurs (GET)

function getUsers(req, res){
    User.find((err, users) => {
        if(err){
            res.send(err)
        }
        res.send(users);
    });
}
module.exports = { getUsers };
