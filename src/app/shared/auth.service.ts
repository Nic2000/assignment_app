import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../assignments/user.module';
const AUTH_API = 'http://localhost:8010/api/users';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  user !: User;
  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
    this.loggedIn = true;
  }

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(AUTH_API);
  }
  // logIn(login:string, password:string) {
  //   // normalement il faudrait envoyer une requête sur un web service, passer le login et le password
  //   // et recevoir un token d'authentification, etc. etc.

  //   // pour le moment, si on appelle cette méthode, on ne vérifie rien et on se loggue
  //   this.loggedIn = true;
  // }

    logOut() {
      this.loggedIn = false;
    }

  isAdmin() {
    let isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.login);
    });
    //return this.loggedIn;
    return isUserAdmin;
  }

  permis = false;


  isPermis(){
    this.getUsers().subscribe( reponse => {
      for(var val of reponse) {
        if(val.email===this.user.email && val.password===this.user.password){
          if(val.isAdmin){
            this.permis=true;
          }
        }
      }
    });

  }
  // // isAdmin().then(admin => { if(admin) { console.log("L'utilisateur est administrateur"); }})

  // constructor() { }
}
