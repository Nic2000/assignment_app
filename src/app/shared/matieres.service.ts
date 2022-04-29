import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matiere } from "../assignments/matiere.model";
import {catchError, map, Observable, tap} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private http:HttpClient) { }
  getMatieres():Observable<Matiere[]> {
    return this.http.get<Matiere[]>("http://localhost:8010/api/matieres");
  }
}
