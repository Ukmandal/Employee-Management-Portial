import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: any = {};
  errorMessage: string;
  constructor(private router: Router, private LoginService: LoginService) { }

  ngOnInit() {
    sessionStorage.removeItem('UserName');
    sessionStorage.clear();
  }

  login() {
    this.LoginService.Login(this.model).subscribe(
      data => {
        console.log(this.model);
        if (data.Status == "Success") {
          console.log(this.model);
          this.router.navigate(['/Dashboard']);
        }
        else {
          this.errorMessage = data.Message;
        }
      },
      error => {
        this.errorMessage = error.message;
      });
  };

  register() {
    this.router.navigate(['/register']);
  }
}     
