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

  transportApiKey = 'XKlhujQMZdr9sbjy19V0Kv3zUOafutf7NRNq';
  transportApiTripPlannerEndpoint = 'https://api.transport.nsw.gov.au/v1/tp/';

  getDestinations(): Observable<Array<stationsObject>> {
    return this.http.get<stationsObject[]>(this.stationsJsonURL)
  }

  getTrip(tripOrigin: any, tripDestination: any, tripDate: any): Observable<any> {
    const apiCall = 'trip';

    const tripHTTPHeaders = {
      headers: {
        'Authorization': `apikey ${this.transportApiKey}`
      }
    }

    // request paramaters
    const params = new URLSearchParams({
      'outputFormat': 'rapidJSON',
       'coordOutputFormat': 'EPSG:4326',
        'depArrMacro': 'dep',
      'itdDate': tripDate,
      'itdTime': '00:00',
      'type_origin': 'stop',
      'name_origin': tripOrigin,
      'type_destination': 'stop',
      'name_destination': tripDestination,
      'TfNSWTR': 'true'
    });

    return this.http.get<any>(this.transportApiTripPlannerEndpoint + 
      apiCall + '?' + params, tripHTTPHeaders
      )
  }

}
