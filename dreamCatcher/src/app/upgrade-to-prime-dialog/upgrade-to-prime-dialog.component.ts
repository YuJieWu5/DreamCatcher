import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upgrade-to-prime-dialog',
  templateUrl: './upgrade-to-prime-dialog.component.html',
})
export class UpgradeToPrimeDialogComponent {
  constructor(private dialogRef: MatDialogRef<UpgradeToPrimeDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onUpgrade(): void {
    this.dialogRef.close(true);
  }
}
