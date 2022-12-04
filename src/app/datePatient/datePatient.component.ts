import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from '../services/patient.service';
import { CalendarOptions } from '@fullcalendar/angular'
import { formatDate } from '@fullcalendar/angular';
import { fi } from 'date-fns/locale';
import { daysInWeek, isToday } from 'date-fns';



@Component({
  selector: 'app-datePatient',
  templateUrl: './datePatient.component.html',
  styleUrls: ['./datePatient.component.css']
})
export class DatePatientComponent implements OnInit {

  indice: number;

  dates: any= [];
  fixedDates: any = []
  idDates: Array<string>
  newDate: Date;

  patient: any;

  //CALENDARIO_____________________________________________


  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    dateClick: this.handleDateClick.bind(this),
    events: [
      { title: 'd', date: '2022-04-01' },
      { title: 'event2', date: '2022-04-02' }
    ],

    weekends: false,
    locale: 'esLocale',
    height: '60vh',
    allDaySlot: false,
    initialDate: new Date(),
    scrollTime: "06:00:00",
    headerToolbar: {
      left: 'timeGridWeek,timeGridDay',
      center: 'title',
      right: 'prev,next'
    },
    nowIndicator: true,
    buttonText: {
      today: 'Hoy',
      day: 'Dia',
      week: 'Semana'
    }
  };

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends
  }

  handleDateClick(arg) {
    this.newDate = new Date(arg.date)
    this.setNewDate()
  }

  str = formatDate(new Date(), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',

  })
  //_______________________________________________________

  constructor(private patientService: PatientService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

    this.indice = this.activatedRoute.snapshot.params['id'];

    this.getPatientData(this.indice);


  }




  goToPatient() {
    this.router.navigate(['patient/' + this.indice]);
  }


  getPatientData(index: number) {
    return this.patientService.getPatient(index).subscribe((
      mypatient) => {

      this.patient = mypatient;
      console.log(this.patient)
      console.log(mypatient)

      console.log(this.patient.dates)

      this.dates = Object.values(this.patient.dates);
      console.log(this.dates)
      this.idDates = Object.keys(this.patient.dates);
      console.log(this.idDates)


      this.dates.forEach((date: string) => {
        console.log(date)
        if (new Date(date).getFullYear() > 2005)
          this.fixedDates.push(new Date(date).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }))
        console.log(this.fixedDates)
      });

      
    }
    )
  }

  setNewDate() {

    confirm('Confirme la cita para ' + this.patient.firstName + ' ' + this.patient.lastName + ': \n' + '' + this.newDate.toLocaleString()) ?

      this.dates.push(this.newDate) &&

      this.patientService.setNewDate(this.indice, this.newDate.getHours(), this.newDate.getMinutes(), this.newDate.getDate(), this.newDate.getMonth(), this.newDate.getFullYear()) :

      false

  }

  deleteDate(index: number) {
    let dateId = this.idDates[index];

    confirm('¿Eliminar cita?') ?

      this.dates.splice(index, 1) &&
      window.location.reload &&
      this.patientService.deleteDate(this.indice, dateId) : false

  }
}
