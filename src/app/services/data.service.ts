import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';
import { LoginService } from './login.service';

@Injectable()
export class DataService {


  constructor(private httpClient: HttpClient, private loginService: LoginService) { }


  savePatients(patients: Patient[]){
    console.log(patients)
    this.httpClient.put('https://apppacientes-2615c-default-rtdb.europe-west1.firebasedatabase.app/datos.json', patients).subscribe(
      response=> console.log('Patients saved:' + response),

      error=> console.log('Error'+ Object.values(error))
    )
  }

  getPatients(){
    const token=this.loginService.getIdToken()
    return this.httpClient.get('https://apppacientes-2615c-default-rtdb.europe-west1.firebasedatabase.app/datos.json?auth=' + token);
  }

  modifyPatient(index:number, patient:Patient){
    const token=this.loginService.getIdToken()

    let url = 'https://apppacientes-2615c-default-rtdb.europe-west1.firebasedatabase.app/datos/' + index + '.json?auth='+token
    this.httpClient.put(url, patient).subscribe(
      response=> alert('Paciente modificado correctamente'),
      error=> console.log('Error'+ error)
    )
  }

  deletePatient(index:number){
    const token=this.loginService.getIdToken()

    let url = 'https://apppacientes-2615c-default-rtdb.europe-west1.firebasedatabase.app/datos/' + index + '.json?auth='+token
    return this.httpClient.delete(url).subscribe(
      response=>{
        alert('Paciente borrado correctamente')
      },
      error=>{
        console.log(error)
      }
    )
  }

  getPatient(index:number){
    const token=this.loginService.getIdToken()

    let url = 'https://apppacientes-2615c-default-rtdb.europe-west1.firebasedatabase.app/datos/' + index + '.json?auth='+token
    return this.httpClient.get(url)
  }

  setNewDate(index: number, hour: number, minute:number, day:number, month:number, year:number){
    const token=this.loginService.getIdToken()

    let newDate = new Date(year, month, day, hour, minute)
    let url = 'https://apppacientes-2615c-default-rtdb.europe-west1.firebasedatabase.app/datos/'+ index +'/dates.json?auth='+token
    return this.httpClient.post(url, newDate).subscribe(
      response=>{ console.log(response)},
      error=>{
        console.log(error)
      }
    )
  }

  deleteDate(index: number, id: string){

    const token=this.loginService.getIdToken()


    let url = 'https://apppacientes-2615c-default-rtdb.europe-west1.firebasedatabase.app/datos/'+ index +'/dates/'+ id + '.json?auth='+token;
    return this.httpClient.delete(url).subscribe(
      response=>console.log(response), 
      error=> console.log(error)
    )
  }
}

/**
 * // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfrPJELevtxcxeignDztyxhjvFw5GGacg",
  authDomain: "apppacientes-2615c.firebaseapp.com",
  projectId: "apppacientes-2615c",
  storageBucket: "apppacientes-2615c.appspot.com",
  messagingSenderId: "433750495232",
  appId: "1:433750495232:web:2817742a0bb97abc04c8e5",
  measurementId: "G-67EQTS914F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)
 */