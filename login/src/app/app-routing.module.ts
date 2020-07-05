import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard Page'
    },
    children: [
      {
        path: 'employee',
        component: EmployeeComponent,
        data: {
          title: 'Employee Page'
        },
     },
     {
      path: 'department',
      component: DepartmentComponent,
      data: {
        title: 'Department Page'
      },
     },
 ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),  RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }    