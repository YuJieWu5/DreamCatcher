import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // If using Angular Material
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { CreateListDialogComponent } from '../create-list-dialog/create-list-dialog.component';
import { FavoriteList } from '../../model/FavoriteList';
import { Scene } from '../../model/Scene';
import { mockFavoriteList } from '../../mockdata/data';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favoritelistpage.component.html',
  styleUrls: ['./favoritelistpage.component.css']
})
export class FavoritelistpageComponent implements OnInit {
  favoriteLists: FavoriteList[] = [];
  selectedList: FavoriteList | null = null;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadFavoriteLists();
  }

  loadFavoriteLists() {
    // Mock data for testing
    this.favoriteLists = mockFavoriteList;
  }

  openCreateListDialog() {
    const dialogRef = this.dialog.open(CreateListDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: { name: string; description: string }) => {
      if (result) {
        const duplicate = this.favoriteLists.some(list => list.name === result.name);
        if (duplicate) {
          alert('List name already exists. Please choose a different name.');
        } else {
          this.favoriteLists.push({
            name: result.name,
            description: result.description,
            scenes: [],
          });
        }
      }
    });
  }

  selectList(list: FavoriteList) {
    this.selectedList = list;
  }

  openListMenu(event: MouseEvent, list: FavoriteList) {
    event.stopPropagation(); // Prevent the click from selecting the list
    list.showMenu = !list.showMenu;
  }

  confirmDeleteList(list: FavoriteList) {
    const confirmed = confirm(`Are you sure you want to delete the list "${list.name}"?`);
    if (confirmed) {
      this.favoriteLists = this.favoriteLists.filter(l => l !== list);
      if (this.selectedList === list) {
        this.selectedList = null;
      }
    }
  }

  viewLocation(location: Scene) {
    this.dialog.open(LocationModalComponent, {
      data: location,
    });
  }
}
