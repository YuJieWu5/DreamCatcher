import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DreamCatcherProxyServiceService } from '../dream-catcher-proxy-service.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogComponent {
  reviews: any[];
  sceneData = {
    sceneId: ''
  };
  newReview = {
    rating: '',
    comment: ''
  };
  message: string = "";
  showAddReviewForm = false;
  constructor(
    private proxy$: DreamCatcherProxyServiceService,
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reviews = data.reviews || []; // Make sure there is a default value
    this.sceneData = data.sceneData;
  }

  ngOnInit() {
    this.initializeComponent();
  }

  onCommentInput() {
    // Maxmium comment is 50 characters
    if (this.newReview.comment.length > 50) {
      // Display warning message
      this.message = "Maximum is 50 characters. Please reduce the length.";
    } else {
      // Clear warning message if comment length is less than 50 characters
      this.message = "";
    }
    // Call isValidReview to update the state of the submit button
    this.isValidReview();
  }

  initializeComponent() {
    // Write the logic you need to execute here
    console.log('Component initialized');
    // For example, getting data, setting initial status, etc.

    const sceneId = this.sceneData.sceneId;
    if (sceneId) {
      this.proxy$.getReview(sceneId).subscribe(response => {
        if (response['success']) {
          this.reviews = response['data'];
        }
      });
    }
  }

  onAddReview(): void {
    this.showAddReviewForm = !this.showAddReviewForm;
  }

  getAverageRating(): number {
    if (this.reviews.length === 0) return 0;
    const totalRating = this.reviews.reduce((sum, review) => sum + parseInt(review.rating), 0);
    return totalRating / this.reviews.length;
  }

  onClose(): void {
    this.dialogRef.close(null); // Close the dialog box without returning any data
    this.showAddReviewForm = !this.showAddReviewForm;
  }

  submitReview() {
    if (this.isValidReview()) {
      const data: Record<string, string> = {
        sceneId: this.sceneData.sceneId,
        rating: this.newReview.rating,
        comment: this.newReview.comment
      }

      this.proxy$.addReview(data).subscribe((result: Record<string, any>) => {
        console.log(result);
        const success = result && result['success'] ? result['success'] : "";
        if (success == true) {
          this.reviews.push(this.newReview); // Add new comment to list
          this.newReview = { rating: '', comment: '' }; // Reset Form
          this.showAddReviewForm = false; // Hide Form
        } else {
          this.message = result['message'];
        }
      })
    } else {
      alert("Comments cannot exceed 50 characters.");
    }
  }

  isValidReview() {
    return this.newReview.rating.trim() !== '' &&
      this.newReview.comment.trim().length <= 50 &&
      this.newReview.comment.trim() !== '';
  }
}
