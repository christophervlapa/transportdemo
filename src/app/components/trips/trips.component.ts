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
  showDepartureTimes = false;
  formattedDepartureDate = '';
  departureTimes: string[] = [];
  noTripsFound = false;

  constructor(private tripsService: TripsService) {
    // make stations drop down list data
    this.tripsService.getDestinations().subscribe((data:any) => {
      this.stationsData = data;
    });
   }

  ngOnInit(): void {
    // Watch for any changes to our trip planner form
    this.onFormChange();
  }

  // make out reactive form
  tripsForm = new FormGroup({
    tripDate: new FormControl('', Validators.required),
    tripFrom: new FormControl('',  Validators.required),
    tripTo: new FormControl('',  Validators.required)
  });

  // Make some getters so the form elements are easy to work with
  get tripDate(): FormControl { return this.tripsForm.controls.tripDate as FormControl; }
  get tripFrom(): FormControl { return this.tripsForm.controls.tripFrom as FormControl; }
  get tripTo(): FormControl { return this.tripsForm.controls.tripTo as FormControl; }

  onFormChange(): void {

    // reset this just in case
    this.noTripsFound = false;

    // IF there is a change to the form
    this.tripsForm.valueChanges.subscribe(x => {
      
      // AND all values are not empty
      if(this.tripDate.value !== '' && this.tripFrom.value !== '' && this.tripTo.value) {

        // format the trip date for the API 
        let tripDateFormatted = `${this.tripDate.value.year}${('0' + this.tripDate.value.month).slice(-2)}${('0' + this.tripDate.value.day).slice(-2)}`;

        // Format the trip date for humans 
        this.formattedDepartureDate = new Date(
          `${this.tripDate.value.year}-${('0' + this.tripDate.value.month).slice(-2)}-${('0' + this.tripDate.value.day).slice(-2)}`
        ).toLocaleDateString('en-GB',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        // call the transportinfo API, and return our trip data
        this.tripsService.getTrip(this.tripFrom.value, this.tripTo.value, tripDateFormatted).subscribe((data:any) => {
       
          let departureTimesTemp: string[] = []

          // IF there are journeys available
          if(data.journeys?.length > 0) {
            // loop though the journeys
            data.journeys.forEach((journey: any) => {
              // Format the departure time like 08:30 am
              console.log(journey.legs[0].origin.departureTimeEstimated);
              let formattedDepartureTime = new Date(journey.legs[0].origin.departureTimeEstimated).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit', hour12: true}).toLocaleLowerCase();
              // Add the departure times array IF it's not in there
              console.log(journey.legs[0].origin.departureTimeEstimated);
              if(!departureTimesTemp.includes(formattedDepartureTime)) {
                departureTimesTemp.push(formattedDepartureTime);
              }
            });
          } else {
            this.noTripsFound = true;
          }

          // If the departure times are there, show them
          if(departureTimesTemp.length > 0) {
            this.showDepartureTimes = true;
          }

          // Send to the html
          this.departureTimes = departureTimesTemp;
          
        });
      }
      
    })
  }

}
