import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-list-dialog',
  templateUrl: './select-list-dialog.component.html',
  styleUrls: ['./select-list-dialog.component.css']
})
export class SelectListDialogComponent {
  selectedListId: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<SelectListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm() {
    this.dialogRef.close(this.selectedListId);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
