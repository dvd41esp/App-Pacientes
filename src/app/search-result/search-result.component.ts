import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../models/patient.model';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  searchParams: string;

  myPatients: Patient[]= [];

  searchResult: any = []

  searchField: string;

  constructor(private activatedRouter: ActivatedRoute, private patientService: PatientService) { }

  ngOnInit() {

    this.searchParams = this.activatedRouter.snapshot.params['params']

    this.getPatients()

  }

  search(searchInput:any){

    this.searchResult.length = 0

    this.myPatients.forEach((element, index)=>{

      if(element.firstName.toLowerCase().startsWith(searchInput.value.toLowerCase()) || element.lastName.toLowerCase().startsWith(searchInput.value.toLowerCase())){

        let searchMatch = [element.firstName, element.lastName, index];
        
        this.searchResult.push(searchMatch);

        this.searchResult.sort()
      }

    })
    console.log(this.searchResult)
    this.searchField = ''

  }

  getPatients(){

    return this.patientService.getPatients().subscribe(

      patients=> {

        this.myPatients = Object.values(patients)

        this.myPatients.forEach((element, index)=>{

          if(element.firstName.toLowerCase().startsWith(this.searchParams.toLowerCase())){

            let searchMatch = [element.firstName, element.lastName, index]

            this.searchResult.push(searchMatch);

            this.searchResult.sort()

          }
        })

        this.searchField = ''
      }

     
    
    )
  }
}
