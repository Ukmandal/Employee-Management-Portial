import { Injectable } from '@angular/core';
import { Employee } from '../models/employee-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Department } from '../models/department-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  formData: Employee;
  constructor(private http:HttpClient) { }

  readonly APIUrl = 'http://localhost:55075/api/Employee';

  getEmpList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.APIUrl + '/AllEmployees');
  }

  getSingleEmpList(id: number): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.APIUrl + '/GetEmployeesById/' + id) 
  }

  addEmployee(emp:Employee){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post(this.APIUrl+'/InsertEmployees', emp, httpOptions);
  }

  updateEmployee(emp:Employee){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put(this.APIUrl+'/UpdateEmployees', emp,httpOptions);
  }

  deleteEmployee(id: number){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete(this.APIUrl+'/DeleteEmployees?id='+ id, httpOptions);
  }
 
  getDepDropDownValues(){
    return this.http.get<Department[]>(this.APIUrl+'/Department');
  }
  
  private _listener = new Subject<any>();
  listen(): Observable<any>{
    return this._listener.asObservable();
  }

  filter(filterBy: string){
    this._listener.next(filterBy);
  }
}