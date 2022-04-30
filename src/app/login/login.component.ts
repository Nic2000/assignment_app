import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../shared/auth.service";
import { Subscription } from 'rxjs';
import { User } from '../assignments/user.module';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form = this.buildForm();
  isMobile = false;

  email !:String;
  password !: String;
  erreur_msg ?: String;
  private subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private authservice:AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Handset])
        .subscribe((result) => (this.isMobile = result.matches))
    );
    this.form = this.buildForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  login(): void {
    if (this.form?.invalid) {
      this.form?.markAllAsTouched();
      return;
    }
    else{
        this.authservice.getUsers().subscribe( reponse => {
          for(var val of reponse) {
            if(val.email===this.email && val.password===this.password){
              this.authservice.loggedIn=true;
              this.router.navigate(['/home'])
            }
          }
          this.erreur_msg="login incorrect ";
        });
    }
    // TODO: make login call
  }

  resetValue(fieldControlName: string): void {
    this.form?.get(fieldControlName)?.reset(null);
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }
}
