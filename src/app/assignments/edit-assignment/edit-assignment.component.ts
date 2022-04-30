import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { EleveService } from 'src/app/shared/eleves.service';
import { MatiereService } from 'src/app/shared/matieres.service';
import { Assignment } from '../assignment.model';
import { Eleve } from '../eleve.model';
import { Matiere } from '../matiere.model';
@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;


  nomAssignment!: string;
  dateDeRendu!: Date;
  eleve!:Eleve;
  matiere!:Matiere;
  note!:number;
  remarques!:string;

  constructor(
    private assignmentsService: AssignmentsService,
    private elevesService:EleveService,
    private matiereService:MatiereService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ici un exemple de récupération des query params et du fragment
    let queryParams = this.route.snapshot.queryParams;
    console.log("Query params :")
    console.log(queryParams);
    console.log("Fragment :")
    console.log(this.route.snapshot.fragment);

    this.getAssignment();
    this.getEleves();
    this.getMatieres();
  }
  eleves!:Eleve[] ;
  matieres!:Matiere[];
  getEleves() {
    // demander les données au service de gestion des eleves...
    this.elevesService.getEleves()
    .subscribe(reponse => {
    //  console.log("données arrivées",reponse);
      this.eleves = reponse;
    });

   // console.log("Après l'appel au service");
  }
  getMatieres() {
    // demander les données au service de gestion des matieres...
    this.matiereService.getMatieres()
    .subscribe(reponse => {
      this.matieres = reponse;
    });
  }
  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;

      this.assignment = assignment;
      // Pour pré-remplir le formulaire
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.eleve = assignment.eleve;
      this.matiere = assignment.matiere;
      this.note = assignment.note;
      this.remarques = assignment.remarques;
    });
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.eleve = this.eleve;
    this.assignment.matiere = this.matiere;
    this.assignment.note = this.note;
    this.assignment.remarques = this.remarques;

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }
}
