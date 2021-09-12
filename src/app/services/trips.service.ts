import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stationsObject } from '../components/common/stations.interface';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor (private http: HttpClient) {};

  stationsJsonURL = '../../assets/mockdata/stationsData.json';

  labmdaEndpoint = 'https://o67jdrqa04.execute-api.ap-southeast-2.amazonaws.com/prod/tripsapi';

  getDestinations(): Observable<Array<stationsObject>> {
    return this.http.get<stationsObject[]>(this.stationsJsonURL)
  }

  getTrip(tripOrigin: any, tripDestination: any, tripDate: any): Observable<any> {
  
    // request paramaters
    const params = new URLSearchParams({
      'tripDate': tripDate,
      'tripOrigin': tripOrigin,
      'tripDestination': tripDestination
    });

    return this.http.get<any>(this.labmdaEndpoint + 
      '?' + params
      )
  }

}
