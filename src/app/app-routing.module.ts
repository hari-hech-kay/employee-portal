import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListemployeesComponent } from './listemployees/listemployees.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardGuard } from './services/auth-guard.guard';

const routes: Routes = [
  {
    path: 'employee-list',
    component: ListemployeesComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
