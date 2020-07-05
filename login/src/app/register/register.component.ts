import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Register } from '../models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data = false;
  employeeForm: FormGroup;
  massage: string;

  constructor(private router: Router, private formbulider: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.employeeForm = this.formbulider.group({
      UserName: ['', [Validators.required]],
      LoginName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      ContactNo: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Status: ['', [Validators.required]],
      IsApproved: ['', [Validators.required]],
    });
  }

  onFormSubmit() {
    const user = this.employeeForm.value;
    this.createEmployee(user);
  }

  createEmployee(register: Register) {
    this.loginService.CreateUser(register).subscribe(
      (x) => {
        this.data = true;
        this.router.navigate(['/login']);
        this.massage = 'Data saved Successfully';
        this.employeeForm.reset();
      });
  }
}    
