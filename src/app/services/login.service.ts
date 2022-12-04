import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import firebase from "firebase/compat/app";

import 'firebase/compat/auth'

@Injectable()
export class LoginService{

    constructor(private router: Router){ }

    token:string;

    login(email: string, password: string){

        firebase.auth().signInWithEmailAndPassword(email, password).then(

            response=>{
                firebase.auth().currentUser.getIdToken().then(

                    token=>{
                        this.token=token;
                        //this.cookie.set('token', this.token)
                        this.router.navigate(['/']);
                    }
                )
            },
            error=>{
                console.log(error)
            }
        );

    }

    getIdToken(){
        
        return this.token;
        //return this.cookie.get('token');
    }

    isLoggedIn(){

        //return this.cookie.get('token')
        return this.token;

    }

    logout(){

        firebase.auth().signOut().then(()=>{

            this.token = '';

            //this.cookie.set('token', '');

            this.router.navigate(['/']);

            window.location.reload();

        })
    }
}