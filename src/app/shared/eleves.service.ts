import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Eleve} from "../assignments/eleve.model";
import {catchError, map, Observable, tap} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class EleveService {

  constructor(private http:HttpClient) { }
  getEleves():Observable<Eleve[]> {
    return this.http.get<Eleve[]>("http://localhost:8010/api/eleves");
  }
}
