import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PatientComponent } from './patient/patient.component';
import { HomeComponent } from './home/home.component';
import { PatientsComponent } from './patients/patients.component';
import { AddPatientComponent } from './addPatient/addPatient.component';
import { UpdatePatientComponent } from './updatePatient/updatePatient.component';
import { DatePatientComponent } from './datePatient/datePatient.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { LoginComponent } from './login/login.component';

import { DataService } from './services/data.service';
import { PatientService } from './services/patient.service';
import { LoginService } from './services/login.service';
import { LoginGuardian } from './login/login_guardian';

import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
  listPlugin,

])

const routes: Routes = [
      {path: '', component: HomeComponent, canActivate:[LoginGuardian]},
      {path: 'patient/:id', component: PatientComponent, canActivate:[LoginGuardian]},
      {path: 'patients', component: PatientsComponent, canActivate:[LoginGuardian]},
      {path: 'add-patient', component: AddPatientComponent, canActivate:[LoginGuardian]},
      {path: 'update-patient/:id', component: UpdatePatientComponent, canActivate:[LoginGuardian]},
      {path: 'date-patient/:id', component: DatePatientComponent, canActivate:[LoginGuardian]},
      {path: 'login', component: LoginComponent},
      {path: 'search/:params', component: SearchResultComponent, canActivate:[LoginGuardian]},
      {path: '**', component: ErrorPageComponent}
      ];


@NgModule({
  declarations: [							
    AppComponent,
    PatientComponent,
    HomeComponent,
    PatientsComponent,
    AddPatientComponent,
    UpdatePatientComponent,
    DatePatientComponent,
    ErrorPageComponent,
    SearchResultComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FullCalendarModule
  ],
  providers: [PatientService, DataService, LoginService, LoginGuardian],
  bootstrap: [AppComponent]
})
export class AppModule { }
