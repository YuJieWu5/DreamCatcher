import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import {DreamCatcherProxyServiceService} from '../dream-catcher-proxy-service.service'; // 确保路径正确

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
    private dialog: MatDialog, // 注入MatDialog服务
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
    // 假设sceneId是从data中获取的

    // 用户已登录，打开评论对话框
    const reviewDialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '800px',
      data: { reviews: [], sceneData: this.data },
      panelClass: 'custom-dialog-container',
      hasBackdrop: true
    });
  }
}
