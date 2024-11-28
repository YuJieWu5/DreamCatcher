import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import {DreamCatcherProxyServiceService} from '../dream-catcher-proxy-service.service'; // make sure the path is correct

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent {
  reviews = [

  ];

  constructor(
    public dialogRef: MatDialogRef<LocationModalComponent>,
    private router: Router,
    private proxy$: DreamCatcherProxyServiceService,
    private dialog: MatDialog, // inject MatDialog service
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  save() {
    // Implement save functionality
    console.log('Location saved:', this.data.title);
  }

  close(): void {
    this.dialogRef.close();
  }

  openReviewDialog() {
    this.dialogRef.close();
    // Assume sceneId is achieved from data

    // User have already login and open the review box
    const reviewDialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '800px',
      data: { reviews: [], sceneData: this.data },
      panelClass: 'custom-dialog-container',
      hasBackdrop: true
    });
  }
}
