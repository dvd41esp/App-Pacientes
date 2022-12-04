import { first } from "rxjs"

export class Patient {


    constructor(
        firstName: string,
        lastName: string ,
        age: number,
        visitReason: string,
        medHistory: string,
        physicHistory: string,
        dataProtectDoc: boolean,
        infoConsent: boolean,
        dates?: any
    ) {

        firstName = this.firstName
        lastName = this.lastName
        age = this.age
        visitReason = this.visitReason
        medHistory = this.medHistory
        physicHistory = this.physicHistory
        dataProtectDoc = this.dataProtectDoc
        infoConsent = this.infoConsent

    
    }
    firstName = ''
    lastName = ''
    age = 0;
    visitReason = ''
    medHistory = ''
    physicHistory = ''
    dataProtectDoc = false
    infoConsent = false
    dates = [new Date(0).toISOString()]



}