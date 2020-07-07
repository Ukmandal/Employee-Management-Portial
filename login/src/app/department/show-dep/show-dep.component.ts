import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/app/models/department-model';
import { DepartmentService } from 'src/app/services/department.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDepComponent } from '../add-dep/add-dep.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDepComponent } from '../edit-dep/edit-dep.component';
import { MatPaginator } from '@angular/material/paginator';
import * as jsPDF from 'jspdf';
import * as xlsx from 'xlsx';
import { DeleteDepComponent } from '../delete-dep/delete-dep.component.ts';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service: DepartmentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.service.listen().subscribe((m) => {
      console.log(m);
      this.RefreshDepLsit();
    })
  }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['DepartmentID', 'DepartmentName', 'Options']
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;

  ngOnInit(): void {
    this.RefreshDepLsit();
  }

  RefreshDepLsit() {
    this.service.getDepList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  applyFiler(filterValue: string) {
    this.listData.filter = filterValue.trim().toLocaleLowerCase();
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddDepComponent, dialogConfig);
  }

  onEdit(dep: Department) {
    console.log(dep);
    this.service.formData = dep;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EditDepComponent, dialogConfig);
  }

  onDelete(id: number) {
    console.log(id);
    let dialogRef = this.dialog.open(DeleteDepComponent, {
      disableClose: true,
      width: '400px',
      height: '200px',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.service.deleteDepartment(id).subscribe((res) => {
        this.RefreshDepLsit();
        this.snackBar.open(res.toString(), 'Deleted Sucessfully!', {
          verticalPosition: 'top',
          duration: 3000
        });
      })
    };
});


    // console.log(id);
    // if (confirm('Are you sure want to delete?')) {
    //   this.service.deleteDepartment(id).subscribe((res) => {
    //     this.RefreshDepLsit();
    //     this.snackBar.open(res.toString(), 'Deleted Sucessfully!', {
    //       verticalPosition: 'top',
    //       duration: 3000
    //     });
    //   })
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
