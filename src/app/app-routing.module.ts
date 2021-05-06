import { ListemployeesComponent } from './listemployees/listemployees.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'add-new-employee',
    component: AddemployeeComponent,
  },
  {
    path: '',
    component: ListemployeesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
