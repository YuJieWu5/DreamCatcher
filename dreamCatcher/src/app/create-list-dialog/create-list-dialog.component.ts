import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-list-dialog',
  templateUrl: './create-list-dialog.component.html',
  styleUrls: ['./create-list-dialog.component.css']
})
export class CreateListDialogComponent {
  listName: string = '';
  listDescription: string = '';

  constructor(public dialogRef: MatDialogRef<CreateListDialogComponent>) {}

  createList() {
    this.dialogRef.close({
      name: this.listName,
      description: this.listDescription,
    });
  }
}
