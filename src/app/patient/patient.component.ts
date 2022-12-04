import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient.model';
import { PatientService } from '../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  indice: number;
  miPaciente: Patient
  hasLOPD: boolean = false;
  hasInfoCons: boolean = false;

  
  

  constructor(private router: Router, private patientService: PatientService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.indice = this.activatedRoute.snapshot.params['id'];
    this.getPatient(this.indice).subscribe(
      
      (mypatient:Patient)=> {
        console.log(mypatient)
        this.miPaciente = mypatient
      }
    )
  }



  showUpdatePatient(){
    this.router.navigate(['update-patient/' + this.indice])
  }

  getPatient(index:number){
    return this.patientService.getPatient(index)
  }

  goToDate(){
    this.router.navigate(['date-patient/' + this.indice])
  }


}
