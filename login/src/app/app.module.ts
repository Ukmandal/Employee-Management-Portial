import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginService } from './services/login.service';
import { DepartmentService } from './services/department.service';
import { EmployeeService } from './services/employee.service';

import { MatButtonModule } from  '@angular/material/button';
import { MatMenuModule } from  '@angular/material/menu';
import { MatDatepickerModule } from  '@angular/material/datepicker';
import { MatIconModule } from  '@angular/material/icon';
import { MatCardModule } from  '@angular/material/card';
import { MatSidenavModule } from  '@angular/material/sidenav';
import { MatFormFieldModule } from  '@angular/material/form-field';
import { MatInputModule } from  '@angular/material/input';
import { MatTooltipModule } from  '@angular/material/tooltip';
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';  
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { ShowEmpComponent } from './employee/show-emp/show-emp.component';
import { EditEmpComponent } from './employee/edit-emp/edit-emp.component';
import { AddEmpComponent } from './employee/add-emp/add-emp.component';
import { ShowDepComponent } from './department/show-dep/show-dep.component';
import { EditDepComponent } from './department/edit-dep/edit-dep.component';
import { AddDepComponent } from './department/add-dep/add-dep.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    EmployeeComponent,
    DepartmentComponent,
    ShowEmpComponent,
    EditEmpComponent,
    AddEmpComponent,
    ShowDepComponent,
    EditDepComponent,
    AddDepComponent
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    FormsModule,  
    RouterModule,
    ReactiveFormsModule,  
    HttpClientModule,  
    BrowserAnimationsModule,  
    MatButtonModule,  
    MatMenuModule,  
    MatDatepickerModule,  
    MatNativeDateModule,  
    MatIconModule,  
    MatRadioModule,  
    MatCardModule,  
    MatSidenavModule,  
    MatFormFieldModule, 
    MatTableModule, 
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule, 
    MatInputModule,  
    MatTooltipModule,  
    MatToolbarModule,  
    
  ],
  providers: [AppRoutingModule, LoginService, EmployeeService, DepartmentService],
  bootstrap: [AppComponent],
  entryComponents: [AddDepComponent,EditDepComponent, AddEmpComponent, EditEmpComponent],
})
export class AppModule { }
