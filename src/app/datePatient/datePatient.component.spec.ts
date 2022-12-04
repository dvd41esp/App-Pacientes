/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DatePatientComponent } from './datePatient.component';

describe('DatePatientComponent', () => {
  let component: DatePatientComponent;
  let fixture: ComponentFixture<DatePatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
