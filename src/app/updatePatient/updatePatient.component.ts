import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../services/patient.service';
import { Patient } from '../models/patient.model';
import { PatientsComponent } from '../patients/patients.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-updatePatient',
  templateUrl: './updatePatient.component.html',
  styleUrls: ['./updatePatient.component.css']
})
export class UpdatePatientComponent implements OnInit {

  patients: any;

  indice: number

  miPaciente: any;




  constructor(private router: Router, private activatedRouter: ActivatedRoute ,private patientService: PatientService) {}

  ngOnInit() {

    this.patientService.getPatients().subscribe(myPatients=>{
      this.patients = myPatients

      console.log(this.patients)
    })


    this.indice = this.activatedRouter.snapshot.params['id']


    this.getPatient().subscribe((myPatient)=>{

      this.miPaciente = myPatient

      this.firstNameField = this.miPaciente.firstName;
      this.lastNameField = this.miPaciente.lastName;
      this.ageField = this.miPaciente.age;
      this.visitReasonField = this.miPaciente.visitReason;
      this.medHistoryField = this.miPaciente.medHistory;
      this.physicHistoryField = this.miPaciente.physicHistory;
      this.infoConstentField = this.miPaciente.infoConsent;
      this.dataProtectDocField = this.miPaciente.dataProtectDoc;
      

      console.log(this.miPaciente)

    })


    

  }



  
  modifyPatient(){
    let patient: Patient = new Patient('','',0,'','','',false,false,'')

    patient.firstName = this.firstNameField;
    patient.lastName = this.lastNameField;
    patient.age = this.ageField;
    patient.visitReason = this.visitReasonField;
    patient.medHistory = this.medHistoryField;
    patient.physicHistory = this.physicHistoryField;
    patient.infoConsent = this.infoConstentField;
    patient.dataProtectDoc = this.dataProtectDocField;
    patient.dates = this.miPaciente.dates;

    console.log(patient)

    this.patientService.modifyPatientService(this.indice, patient);
    this.router.navigate(['']); 
  }

  getPatient(){
    return this.patientService.getPatient(this.indice)
  }



  deletePatient(){
    this.patients.splice(this.indice, 1)
    this.patientService.deletePatient(this.indice, this.patients);
    this.router.navigate([''])
  }


  volver(){
    this.router.navigate(['patient/'+this.indice])
    

  }
  firstNameField: string;
  lastNameField: string;
  ageField: number
  visitReasonField: string;
  medHistoryField: string;
  physicHistoryField: string;
  infoConstentField: boolean
  dataProtectDocField: boolean


  

}
