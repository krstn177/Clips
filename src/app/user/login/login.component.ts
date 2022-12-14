import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  }

  constructor(private auth: AngularFireAuth, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    
  }
  inSubmission = false;
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created';
  alertColor = 'blue';
  
  async login(){
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being verified';
    this.alertColor = 'blue';
    this.inSubmission = true;
    try { 
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
    }catch(err){
      console.error(err);
      this.alertMsg = 'An unexpected error occurred. Please try again later';
      this.alertColor = 'red';
      this.inSubmission = false;
      return ;
    }
    this.alertMsg = 'Success! You successfully signed in to your account.'
    this.alertColor = 'green';

    this.authService.isAuthenticatedWithDelay$.subscribe(async (isAuthenticated) => {
      if (isAuthenticated) {
        await this.router.navigateByUrl('/');
      }
    });
  }

}
