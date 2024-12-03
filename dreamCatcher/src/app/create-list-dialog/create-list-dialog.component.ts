import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-list-dialog',
  templateUrl: './create-list-dialog.component.html',
  styleUrls: ['./create-list-dialog.component.css']
})
export class CreateListDialogComponent {
  listName: string = '';
  title: string;

  constructor(public dialogRef: MatDialogRef<CreateListDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
  }

  createList() {
    this.dialogRef.close({
      name: this.listName,
    });
  }
}
