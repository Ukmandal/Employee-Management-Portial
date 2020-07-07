import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Department } from '../models/department-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  formData: Department;
  constructor(private http:HttpClient) { }

  readonly APIUrl = 'http://localhost:55075/api/Department';

  getDepList(): Observable<Department[]> {
    return this.http.get<Department[]>(this.APIUrl + '/AllDepartments');
  }

  getSingleDepList(id: number): Observable<Department[]> {
    return this.http.get<Department[]>(this.APIUrl + '/GetDepartmentsById' + id);
  }

  addDepartment(dep:Department){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post(this.APIUrl+'/InsertDepartments', dep, httpOptions);
  }

  deleteDepartment(id: number){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete(this.APIUrl+'/DeleteDepartments?id='+id, httpOptions);
  }

  updateDepartment(dep:Department){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put(this.APIUrl+'/UpdateDepartments', dep, httpOptions);
  }

  private _listener = new Subject<any>();
  listen(): Observable<any>{
    return this._listener.asObservable();
  }

  filter(filterBy: string){
    this._listener.next(filterBy);
  }
}
