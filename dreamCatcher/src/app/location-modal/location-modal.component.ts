import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { DreamCatcherProxyServiceService } from '../dream-catcher-proxy-service.service';
import { SelectListDialogComponent } from '../select-list-dialog/select-list-dialog.component';
import { TripService } from '../../service/trip-service';
import { FavoriteListService } from '../../service/favorite-list-service';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent {
  userId: string;
  isLogin: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<LocationModalComponent>,
    private router: Router,
    private proxy$: DreamCatcherProxyServiceService,
    private dialog: MatDialog,
    private favoriteService: FavoriteListService,
    private tripService: TripService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userId = localStorage.getItem('userId') ?? ""
    if (this.userId !== "") {
      this.isLogin = true;
    }
  }

  openReviewDialog() {
    this.dialogRef.close();
    const reviewDialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '800px',
      data: { reviews: [], sceneData: this.data },
      panelClass: 'custom-dialog-container',
      hasBackdrop: true
    });
  }

  saveToFav() {
    if (!this.isLogin) {
      alert('You need to log in to add to your favorite lists!');
      return;
    }

    this.favoriteService.getFavoriteLists(this.userId).subscribe({
      next: (res) => {
        const dialogRef = this.dialog.open(SelectListDialogComponent, {
          width: '400px',
          data: { title: 'Select a Favorite List', lists: res.favoriteList.map(item => { return { name: item.listName, id: item.favListId } }) },
          hasBackdrop: true
        });

        dialogRef.afterClosed().subscribe(selectedListId => {
          if (selectedListId) {
            this.favoriteService.addSceneToFavoriteList(this.userId, this.data.sceneId, selectedListId).subscribe(() => {
              alert('Added to favorite successfully!');
            });
          }
        });
      },
      error: () => { alert('Failed to retrieve favorite lists. Please try again.'); }
    });
  }

  addToTrip() {
    if (!this.isLogin) {
      alert('You need to log in to add to your trip lists!');
      return;
    }

    this.tripService.getUserTrips(this.userId).subscribe({
      next: (res) => {
        const dialogRef = this.dialog.open(SelectListDialogComponent, {
          width: '400px',
          data: { title: 'Select a Trip List', lists: res.data.map(item => { return { id: item.tripId, name: item.tripName } }) },
          hasBackdrop: true
        });

        dialogRef.afterClosed().subscribe(selectedListId => {
          if (selectedListId) {
            this.tripService.addSceneToTrip(selectedListId, this.data.sceneId).subscribe(() => {
              alert('Added to trip successfully!');
            });
          }
        });
      },
      error: () => { alert('Failed to retrieve trip lists. Please try again.'); }
    });
  }
}
