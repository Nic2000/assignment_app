import {Matiere} from "./matiere.model";
import { Eleve } from "./eleve.model";
export class Assignment {
  _id?:string;
  id!:number;
  nom!:string;
  dateDeRendu!:Date;
  rendu!:boolean;
  eleve!:Eleve;
  matiere!:Matiere;
  note!:number;
  remarques!:string;
}
