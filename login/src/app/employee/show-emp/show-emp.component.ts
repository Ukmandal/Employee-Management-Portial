import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';
import { Employee } from 'src/app/models/employee-model';
import { MatPaginator } from '@angular/material/paginator';
import * as jsPDF from 'jspdf';
import * as xlsx from 'xlsx';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteEmpComponent } from '../delete-emp/delete-emp.component';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {


  constructor(private service: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.service.listen().subscribe((m) => {
      console.log(m);
      this.RefreshEmpLsit();
    })
  }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['EmployeeID', 'EmployeeName', 'Department', 'MailID', 'DOJ', 'Address', 'Phone', 'Salary', 'Age', 'Options']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;

  ngOnInit(): void {
    this.RefreshEmpLsit();
  }

  RefreshEmpLsit() {
    this.service.getEmpList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      console.log(data);
    });
  }

  applyFiler(filterValue: string) {
    this.listData.filter = filterValue.trim().toLocaleLowerCase();
  }

  onAdd() {
    //debugger;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddEmpComponent, dialogConfig);
  }

  onEdit(emp: Employee) {
    //debugger;
    console.log(emp);
    this.service.formData = emp;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EditEmpComponent, dialogConfig);
  }

  onDelete(id: number) {
    console.log(id);
    let dialogRef = this.dialog.open(DeleteEmpComponent, {
      disableClose: true,
      width: '400px',
      height: '200px',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.service.deleteEmployee(id).subscribe((res) => {
        this.RefreshEmpLsit();
        this.snackBar.open(res.toString(), 'Deleted Sucessfully!', {
          verticalPosition: 'top',
          duration: 3000
        });
      })
    };
});

    // if (confirm('Are you sure want to delete?')) {
      // this.service.deleteEmployee(id).subscribe((res) => {
      //   this.RefreshEmpLsit();
      //   this.snackBar.open(res.toString(), 'Deleted Sucessfully!', {
      //     verticalPosition: 'top',
      //     duration: 3000
      //   });
      // })
    // }
  }

  public downloadPDF(): void {
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    const pdfTable = this.pdfTable.nativeElement;
    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });
    doc.save('tableToPdf.pdf');
  }

  exportToExcel() {
    const workSheet = xlsx.utils.json_to_sheet(this.listData.data, { header: ['dataprop1', 'dataprop2'] });
    const workBook: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    xlsx.writeFile(workBook, 'filename.xlsx');
  }
}
