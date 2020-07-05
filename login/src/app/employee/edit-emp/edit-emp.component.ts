import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {
  constructor(public dialogbox: MatDialogRef<EditEmpComponent>,
    public service: EmployeeService,
    private snackBar: MatSnackBar) { }
  public listItems: Array<string> = [];
  ngOnInit(): void {
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

  onClose() {
    this.dialogbox.close();
    this.service.filter('registert Click');
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.service.updateEmployee(form.value).subscribe((res) => {
      this.snackBar.open(res.toString(), 'Updated Sucessfully!', {
        verticalPosition: 'top',
        duration: 3000
      });
    })
  }
}
