export class Assignment {
  _id?:string;
  id!:number;
  nom!:string;
  dateDeRendu!:Date;
  rendu!:boolean;
  auteur!:string;
  matiere!:string;
  note!:number;
  remarques!:string;
}
export class Eleve{
  _id?:string;
  id!:number;
  nom_eleve!:string;
}
export class Matiere{
  _id?:string;
  id!:number;
  matiere!:string;
  photo_matiere!:string;
}
export class Prof{
  _id?:string;
  id!:number;
  nom_prof!:string;
  photo_prof!:string;
}
