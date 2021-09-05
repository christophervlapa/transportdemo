import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TripsService } from '../../services/trips.service';

import * as moment from 'moment';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {


  stationsData: any;

  constructor(private tripsService: TripsService) {
    // make stations data
    this.tripsService.getDestinations().subscribe((data:any) => {
      console.log('data 2 ',data);
      this.stationsData = data;
    });
   }

  ngOnInit(): void {
    this.onFormChange();
  }

  model: NgbDateStruct | undefined;

  tripsForm = new FormGroup({
    tripDate: new FormControl('', Validators.required),
    tripFrom: new FormControl('',  Validators.required),
    tripTo: new FormControl('',  Validators.required)
  });

  get tripDate(): FormControl { return this.tripsForm.controls.tripDate as FormControl; }
  get tripFrom(): FormControl { return this.tripsForm.controls.tripFrom as FormControl; }
  get tripTo(): FormControl { return this.tripsForm.controls.tripTo as FormControl; }

  onFormChange(): void {
    this.tripsForm.valueChanges.subscribe(x => {
      
      if(this.tripDate.value !== '' && this.tripFrom.value !== '' && this.tripTo.value) {

        let tripDateFormatted = `${this.tripDate.value.year}${('0' + this.tripDate.value.month).slice(-2)}${('0' + this.tripDate.value.day).slice(-2)}`;

        this.tripsService.getTrip(this.tripFrom.value, this.tripTo.value, tripDateFormatted).subscribe((data:any) => {
          console.log('Tripdata: ',data);
        });
      }
      
    })
  }

}
