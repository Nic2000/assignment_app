import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Eleve } from '../eleve.model';
import { Matiere } from '../matiere.model';
import { Prof } from '../prof.model';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // Champ de formulaire
  nomAssignment!: string;
  dateDeRendu!: Date;
  eleve!:Eleve;
  eleves!:Eleve[];
  matiere!:Matiere;
  matieres!:Matiere[];
  note!:number;
  remarques!:string;


  constructor(private assignmentsService:AssignmentsService, private router:Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if((!this.nomAssignment) || (!this.dateDeRendu)) return;
    console.log(
      'nom = ' + this.nomAssignment + ' date de rendu = ' + this.dateDeRendu
    );
    if(!this.note){

    }
    let newAssignment = new Assignment();
    newAssignment.id = Math.round(Math.random()*10000000);
    newAssignment.nom = this.nomAssignment;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.eleve = this.eleve;
    newAssignment.matiere = this.matiere;
    newAssignment.note = this.note;
    newAssignment.remarques = this.remarques;

    this.assignmentsService.addAssignment(newAssignment)
    .subscribe(reponse => {
      console.log(reponse.message);

      // il va falloir naviguer (demander au router) d'afficher à nouveau la liste
      // en gros, demander de naviguer vers /home
      this.router.navigate(["/home"]);
    })
  }
}
