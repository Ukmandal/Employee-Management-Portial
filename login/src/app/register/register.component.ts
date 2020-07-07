import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Register } from '../models/register';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  password: boolean = false;
  registerForm: FormGroup;
  data = false;
  massage: string;

  constructor(private router: Router, 
    private formbulider: FormBuilder, 
    private loginService: LoginService,
    public snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.registerForm = this.formbulider.group({
      UserName: ['', [Validators.required, Validators.minLength(3)]],
      LoginName: ['', [Validators.required, Validators.minLength(3)]],
      Password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      Email: ['', [Validators.required, Validators.email]],
      ContactNo: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Status: ['', [Validators.required]],
    });
  }

   togglePassword() {
        this.password = !this.password;
    }

    register() {
    const user = this.registerForm.value;
    this.createEmployee(user);
    let snackBarRef = this.snackBar.open('Registerd Successfully!',
    'Got it!', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
    });
  }

  createEmployee(register: Register) {
    this.loginService.CreateUser(register).subscribe(
      (x) => {
        this.data = true;
        this.router.navigate(['/login']);
        this.massage = 'Data saved Successfully';
        this.registerForm.reset();
      });
  }

  cancel() {
    this.router.navigate(['/register']);
}
}    