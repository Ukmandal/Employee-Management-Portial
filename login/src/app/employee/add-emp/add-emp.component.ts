import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm, FormControl } from '@angular/forms';
import { element } from 'protractor';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {
  constructor(public dialogbox: MatDialogRef<AddEmpComponent>,
    public service: EmployeeService,
    private snackBar: MatSnackBar) { }
  public listItems: Array<string> = [];
  ngOnInit(): void {
    this.resetForm();
    this.dropdownRefresh();
  }

  dropdownRefresh() {
    this.service.getDepDropDownValues().subscribe(data => {
      console.log(data);
      data.forEach(element => {
        this.listItems.push(element["DepartmentName"]);
      })
    })
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    this.service.formData = {
      EmployeeID: 0,
      EmployeeName: '',
      Department: '',
      MailID: '',
      DOJ: null,
      Address: '',
      Phone: null,
      Age: 0,
      Salary: null,
    }
  }

  onClose() {
    this.dialogbox.close();
    this.service.filter('registert Click');
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.service.addEmployee(form.value).subscribe((res) => {
      this.resetForm();
      this.snackBar.open(res.toString(), 'Added Sucessfully!', {
        verticalPosition: 'top',
        duration: 3000
      });
    })
  }
}
