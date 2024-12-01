import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {DreamCatcherProxyServiceService} from '../dream-catcher-proxy-service.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogComponent {
  reviews: any[];
  sceneData ={
    sceneId: ''
  };
  newReview = {
    userName: '',
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

  initializeComponent() {
    // Write the logic you need to execute here
    console.log('Component initialized');
    // For example, getting data, setting initial status, etc.

    const sceneId = this.sceneData.sceneId;
    if (sceneId) {
      this.proxy$.getReview(sceneId).subscribe(response => {
        if (response['success']) {
          this.reviews = response['data'];
          // User logged in, open comment dialog
          // const reviewDialogRef = this.dialog.open(ReviewDialogComponent, {
          //   width: '800px',
          //   data: { reviews: this.reviews, sceneData: this.data },
          //   panelClass: 'custom-dialog-container',
          //   hasBackdrop: true
          // });
        }else {

        }
      });
    }
  }

  onAddReview(): void {

    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.dialogRef.close();
      // The user is not logged in, jump to the login page
      this.router.navigate(['/login']);
    }else {
      // Implementing the logic for adding comments
      this.showAddReviewForm = !this.showAddReviewForm;
    }


  }

  onClose(): void {
    this.dialogRef.close(null); // Close the dialog box without returning any data
    this.showAddReviewForm = !this.showAddReviewForm;
    this.dialogRef.close(null); // Close the dialog box without returning any data

    // Close the dialog box after a delay of 1 second
    setTimeout(() => {
      this.dialogRef.close(null);
    }, 1);

    setTimeout(() => {
      this.dialogRef.close(null);
    }, 10);
  }


  submitReview() {
    if (this.isValidReview()) {

      let userName: string;
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName) {
        userName = storedUserName;
      } else {
        userName = 'defaultUserName';
      }

      let userId: string;
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        userId = storedUserId;
      } else {
        userId = 'defaultUserName';
      }


      const data: Record<string, string> ={
        sceneId: this.sceneData.sceneId,
        userId: userId,
        userName: userName,
        rating : this.newReview.rating,
        comment : this.newReview.comment
      }

      this.proxy$.addReview(data).subscribe((result: Record<string, any>)=>{
        console.log(result);
        const success = result && result['success'] ? result['success'] : "";
        if(success == true){
          this.reviews.push(this.newReview); // Add new comment to list
          this.newReview = { userName: '', rating: '', comment: '' }; // Reset Form
          this.showAddReviewForm = false; // Hide Form
        }else{
          this.message =result['message'];
        }
      })
    }
  }

  isValidReview() {
    let userName: string;
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      userName = storedUserName;
    } else {
      userName = 'defaultUserName';
    }
    this.newReview.userName = userName;
    return this.newReview.rating.trim() !== '' &&
      this.newReview.comment.trim() !== '';
  }
}
