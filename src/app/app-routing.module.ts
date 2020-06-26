import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'employees',  loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
