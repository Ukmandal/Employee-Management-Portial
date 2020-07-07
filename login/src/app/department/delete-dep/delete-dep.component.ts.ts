import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  template: `
  <div style="text-align: center;">
  <h1 mat-dialog-title>Confirm</h1><hr>
  <div mat-dialog-content>{{confirmMessage}}</div>
  <div mat-dialog-actions style="justify-content: center;">
    <button mat-button style="color: #fff;background-color: #153961;" 
    (click)="dialogRef.close(true)">Confirm</button>
    <button  mat-button (click)="dialogRef.close(false)">Cancel</button>
  </div>
  </div>
  `,
})
export class DeleteDepComponent {
  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteDepComponent>) { }
  confirmMessage: string = "Are you sure you want to delete?";
}
