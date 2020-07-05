import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/department.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-dep',
  templateUrl: './edit-dep.component.html',
  styleUrls: ['./edit-dep.component.css']
})
export class EditDepComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<EditDepComponent>,
    public service: DepartmentService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogbox.close();
    this.service.filter('registert Click');
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.service.updateDepartment(form.value).subscribe((res) => {
      this.snackBar.open(res.toString(), 'Updated Sucessfully!', {
        verticalPosition: 'top',
        duration: 3000
      });
    })
  }
}
