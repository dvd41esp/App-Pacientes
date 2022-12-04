import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'App-Pacientes';

  constructor(private router: Router, private loginService: LoginService){

  }
  ngOnInit(){


    firebase.initializeApp({

      apiKey: 'AIzaSyBfrPJELevtxcxeignDztyxhjvFw5GGacg',

      authDomain: 'apppacientes-2615c.firebaseapp.com'


    })
  }
  

  search(search: any){

    if(search.value == ""){

      this.router.navigate(['/search/emptyInput']);

    }else{

      this.router.navigate(['/search/'+ search.value]);

    }

  }

  isLoggedIn(){

    return this.loginService.isLoggedIn();

  }

  logout(){
    this.loginService.logout();
  }

}
