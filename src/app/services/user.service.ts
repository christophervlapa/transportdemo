import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userJsonURL = '../../assets/mockdata/user.json';

  constructor(private http: HttpClient) { }

  getUserData = () => {

    return this.http.get(this.userJsonURL)
    .pipe(
      map(data => data), catchError(
      err => of([])
    )
    );
  }
}
