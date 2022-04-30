import {Prof} from "./prof.model";

export class Matiere {
  _id?:string;
  id!:number;
  nom_matiere!:string;
  image_matiere!:string;
  prof!:Prof;
}
