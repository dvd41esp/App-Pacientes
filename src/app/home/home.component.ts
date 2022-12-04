import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../models/patient.model';
import { PatientService } from '../services/patient.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  title: Date = new Date()
  dayPatients = [];
  misPacientes: Patient[] = [];

  constructor(private patientService: PatientService, private router: Router) {
  }

  ngOnInit() {
    this.getPatients()
    //this.getDayPatients()

    //this.dayPatients = this.getDayPatients()
  }


  getPatients() {
    return this.patientService.getPatients().subscribe(patients => {
      console.log(patients)

      this.misPacientes = Object.values(patients)

      this.misPacientes.forEach((element, index)=>{

        if(element == null){

          console.log('En null')

          this.misPacientes.splice(index,1)

          this.patientService.savePatients(this.misPacientes);

        }

      })

      this.misPacientes.forEach((element) => {

        Object.values(element.dates).forEach((date: string) => {
          if(new Date(date).getFullYear() > 2005 && new Date(date).getDate() == this.title.getDate()){

            this.dayPatients.push(new Date(date).toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' }) +': '+ element.firstName +' '+ element.lastName );
          }
        })
      })

      //Order patients after buiding the dayPatients Array:
      this.dayPatients.sort()

      //Reassign myPatients
      this.misPacientes = Object.values(patients)

      //this.getDayPatients()
    });
  }

  goToPatient(event: Event){

    let patientData = (<HTMLAnchorElement>event.target).innerHTML.trim().split(' ')

    this.misPacientes.forEach((patient, index)=>{

      for(let i = 0; i < patientData.length; i++){

        if(patient.firstName == patientData[i] && patient.lastName == patientData[i+1]){

          this.router.navigate(['patient/' + index])

        }

      }

    })

  }

/*
  getDayPatients() {
    let today = new Date()
    let dayPatients = []
    this.misPacientes.forEach((element) => {

      Object.values(element.dates).forEach((date: string) => {

        if (new Date(date).getDate() == today.getDate()) {
          dayPatients.push(element.firstName + ' a las ' + new Date(date).toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' }));

        }
      })
    })
    return dayPatients
  }
*/
}
