import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { TripsComponent } from './components/trips/trips.component';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'trips', component: TripsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
