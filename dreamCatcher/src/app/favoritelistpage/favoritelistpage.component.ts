import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteListService } from '../../service/favorite-list-service';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { CreateListDialogComponent } from '../create-list-dialog/create-list-dialog.component';
import { FavoriteList, FavoriteListSummary } from '../../model/FavoriteList'
import { Scene } from '../../model/Scene'

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favoritelistpage.component.html',
  styleUrls: ['./favoritelistpage.component.css'],
})
export class FavoritelistpageComponent implements OnInit {
  favoriteLists: FavoriteListSummary[] = [];
  selectedList: FavoriteList | null = null;
  userId: string = localStorage.getItem('userId') ?? "";

  constructor(private dialog: MatDialog, private favoriteListService: FavoriteListService) {}

  ngOnInit(): void {
    this.loadFavoriteLists();
  }

  loadFavoriteLists() {
    this.favoriteListService.getFavoriteLists(this.userId).subscribe(
      {
      next: (res) => {
        this.favoriteLists = res.favoriteList;
        console.log(this.favoriteLists)
      },
      error: (error) => {
        console.error('Error loading favorite lists:', error);
      }
  });
  }

  selectList(list: FavoriteListSummary) {
      if (list.scenes && list.scenes.length > 0) {
        this.favoriteListService.getScenes(list.scenes).subscribe({
          next: (res) =>  {
            const scenes = res.data
            const selectedList: FavoriteList = {
              favListId: list.favListId,
              listName: list.listName,
              scenes: scenes
            };
            selectedList.scenes = scenes;
            this.selectedList = selectedList
          },
          error: (error) => {
            console.error('Error loading scenes:', error);
          }
      }
      )
    } else {

    }
  }

  openCreateListDialog() {
    const dialogRef = this.dialog.open(CreateListDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: { listName: string; }) => {
      if (result) {
        // Check for duplicate names
        const duplicate = this.favoriteLists.some((list) => list.listName === result.listName);
        if (duplicate) {
          alert('List name already exists. Please choose a different name.');
        } else {
          // Create the new list via the API
          this.favoriteListService.createFavoriteList(this.userId, result).subscribe({
            next: (newList) => {
              this.favoriteLists.push(newList);
            },
            error: (error) => {
              console.error('Error creating favorite list:', error);
            }
        });
        }
      }
    });
  }

  openListMenu(event: MouseEvent, list: FavoriteListSummary) {
    event.stopPropagation(); // Prevent the click from selecting the list
    list.showMenu = !list.showMenu;
  }

  confirmDeleteList(list: FavoriteListSummary) {
    const confirmed = confirm(`Are you sure you want to delete the list "${list.listName}"?`);
    if (confirmed) {
      // Call API to delete the list
      this.favoriteListService.deleteFavoriteList(this.userId, list.favListId).subscribe({
        next: () => {
          // Remove from favoriteLists
          this.favoriteLists = this.favoriteLists.filter((l) => l.favListId !== list.favListId);
          if (this.selectedList?.favListId === list.favListId) {
            this.selectedList = null;
          }
        },
        error: (error) => {
          console.error('Error deleting favorite list:', error);
        }
    });
    }
  }

  viewLocation(location: Scene) {
    this.dialog.open(LocationModalComponent, {
      data: location,
    });
  }
}
