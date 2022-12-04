import { Component, Injectable, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';

@Injectable()
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  pacientes: any = [];
  
  
  constructor(private _router: Router, private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.setPatients(this.pacientes);
    this.pacientes = this.getPatients()
    this.patientService.setPatients(this.pacientes)
  }

  goToAddPatient(){
    this._router.navigate(['add-patient'])
  }

  getPatients(){
    return this.patientService.getPatients().subscribe(
      mypatients=> this.pacientes = Object.values(mypatients))
  }


}
