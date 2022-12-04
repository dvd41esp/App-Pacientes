import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient.model';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addPatient',
  templateUrl: './addPatient.component.html',
  styleUrls: ['./addPatient.component.css']
})
export class AddPatientComponent implements OnInit {


  patients: Patient[] = []

  constructor(private _patientService: PatientService, private router: Router) { }


  ngOnInit() {
    this.getPatients()
  }

  addNewPatient(){
    
    let newPatient: Patient  = new Patient('','',0,'','','',false,false);

    newPatient.firstName = this.firstNameField;
    newPatient.lastName = this.lastNameField;
    newPatient.age = this.ageField;
    newPatient.visitReason = this.visitReasonField;
    newPatient.medHistory = this.medHistoryField;
    newPatient.physicHistory = this.physicHistoryField;
    newPatient.infoConsent = this.infoConstentField;
    newPatient.dataProtectDoc = this.dataProtectDocField;

    this._patientService.addNewPatient(newPatient, this.patients);    
    
  }

  volverHome(){
    this.router.navigate([''])
  }


  getPatients(){
    return this._patientService.getPatients().subscribe(myPatients=>{
      console.log(myPatients)
      this.patients = Object.values(myPatients)
      console.log(this.patients)
    })
  }

  //Form validator: 

  
  firstNameField = '';
  lastNameField= ''
  ageField = 0
  visitReasonField = ''
  medHistoryField = ''
  physicHistoryField = ''
  infoConstentField = false
  dataProtectDocField = false
}
