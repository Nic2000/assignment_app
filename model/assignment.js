let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    eleve : {
        id : Number,
        nom_eleve : String
    },
    note : Number,
    remarques : String,
    matiere: {
        id: Number,
        nom_matiere: String,
        image_matiere: String,
        prof: {
            id: Number,
            nom_prof: String,
            photo_prof: String
        }
    }
});

// Pour ajouter la pagination
AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('assignments', AssignmentSchema);
