import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Patient } from "../models/patient.model";
import { DataService } from "./data.service";

@Injectable()
export class PatientService implements OnInit {



    pacientes: Patient[] = []

    constructor(private router: Router, private dataService: DataService) {
    }
    ngOnInit(): void {
        this.getPatientsService()
    }

    setPatients(patients: any) {
        this.pacientes = patients;

    }


    deletePatient(index: number, patients: any) {

        console.log(this.pacientes)

        this.pacientes = patients

        this.dataService.deletePatient(index)


        this.dataService.savePatients(this.pacientes)

    }

    addNewPatient(patient: Patient, patients: Patient[]) {

        this.getPatients().subscribe(myPatients => {
            this.pacientes = Object.values(myPatients)
            this.setPatients(patients)


            let newPatients: any = []
            let newPatient: Patient = new Patient('', '', 0, '', '', '', false, false, '')
            newPatient.firstName = patient.firstName
            newPatient.lastName = patient.lastName
            newPatient.age = patient.age
            newPatient.visitReason = patient.visitReason
            newPatient.physicHistory = patient.physicHistory
            newPatient.medHistory = patient.medHistory
            newPatient.dataProtectDoc = patient.dataProtectDoc
            newPatient.infoConsent = patient.infoConsent
            newPatient.dates = patient.dates


            if (newPatient.firstName === '') {
                newPatient.firstName = 'Nombre no añadido'
            }

            if (this.pacientes == null) {
                console.log(this.pacientes)


                newPatients.push(patient)
                this.dataService.savePatients(this.pacientes)

            } else {
                console.log(this.pacientes)

                this.pacientes.push(newPatient)



                this.dataService.savePatients(this.pacientes);

                

                
            }
        })


        
    }


    modifyPatientService(index: number, patient: Patient) {
        console.log(this.pacientes)
        this.pacientes[index] = patient;
        this.dataService.modifyPatient(index, patient)
    }

    getPatients() {
        return this.dataService.getPatients()
    }

    getPatientsService() {
        return this.dataService.getPatients().subscribe(myPatients => {
            console.log(myPatients)
            this.pacientes = Object.values(myPatients)
        })
    }

    getPatientService(index: number) {
        console.log(this.pacientes)
        return this.pacientes[index];
    }

    getPatient(index: number) {
        return this.dataService.getPatient(index)
    }

    setNewDate(index: number, hour: number, minute: number, day: number, month: number, year: number) {

        this.dataService.setNewDate(index, hour, minute, day, month, year)
    }

    deleteDate(index: number, id: string) {
        this.dataService.deleteDate(index, id)
    }

    savePatients(patients) {
        return this.dataService.savePatients(patients)
    }

}