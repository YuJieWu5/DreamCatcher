import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteListService } from '../../service/favorite-list-service';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { CreateListDialogComponent } from '../create-list-dialog/create-list-dialog.component';
import { FavoriteList, FavoriteListSummary } from '../../model/FavoriteList'
import { Scene } from '../../model/Scene'
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-favorite-list',
  templateUrl: './favoritelistpage.component.html',
  styleUrls: ['./favoritelistpage.component.css'],
})
export class FavoritelistpageComponent implements OnInit {
  favoriteLists: FavoriteListSummary[] = [];
  selectedList: FavoriteList | null = null;
  isLogin: boolean = false;
  isPrime: boolean = false;

  constructor(
    private dialog: MatDialog, 
    private favoriteListService: FavoriteListService, 
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadFavoriteLists();
    this.loadSelectList();
  }

  loadFavoriteLists() {
    this.favoriteListService.getFavoriteLists().subscribe(
      {
      next: (res) => {
        this.isLogin = true;
        this.favoriteLists = res.favoriteList;
        this.isPrime = res.auth==='prime';
      },
      error: (error) => {
        this.isLogin = false;
        console.error('Error loading favorite lists:', error);
      }
    });
  }

  loadSelectList(){
    this.route.params.subscribe((params) => {
      const listId = params['id'];
      if (listId) {
        this.favoriteListService.getFavoriteList(listId).subscribe(
          {
          next: (res) => {
            // console.log(res['data'][0]);
            const list = res['data'][0];
            const favListId = list['favListId'];
            const listName = list['listName'];
            this.favoriteListService.getScenes(list['scenes']).subscribe({
              next: (res) =>  {
                const scenes = res.data
                const selectedList: FavoriteList = {
                  favListId: favListId,
                  listName: listName,
                  scenes: scenes
                };
                this.selectedList = selectedList;
              },
              error: (error) => {
                console.error('Error loading scenes:', error);
              }
           })
          },
          error: (error) => {
            console.error('Error loading favorite lists:', error);
          }
        });
      }
    });
  }

  selectList(list: FavoriteListSummary) {
    if (list.scenes) {
      this.router.navigate(['favlist', list.favListId]);
    }
  }

  openCreateListDialog() {
    if(this.isPrime){
    const dialogRef = this.dialog.open(CreateListDialogComponent, {
      width: '300px',
      data: { title: 'Add a New Favorite List' }
    });

    dialogRef.afterClosed().subscribe((result: { name: string; }) => {
      console.log(result.name);
      if (result) {
        // Check for duplicate names
        const duplicate = this.favoriteLists.some((list) => list.listName === result.name);
        if (duplicate) {
          alert('List name already exists. Please choose a different name.');
        } else {
          // Create the new list via the API
          this.favoriteListService.createFavoriteList(result.name).subscribe({
            next: (res) => {
              if(res['success']){
                const ls = res['favoriteList'];
                console.log(ls);
                const newList: FavoriteListSummary = {
                  favListId: ls.favListId,
                  listName: ls.listName,
                  scenes: ls.scenes
                };
                this.favoriteLists.push(newList);
                }
              },
              error: (error) => {
                console.error('Error creating favorite list:', error);
              }
          });
          }
        }
      });
    }else{
      alert('You need to upgrade to create more Favorite List!');
      return;
    }
    
  }

  openListMenu(event: MouseEvent, list: FavoriteListSummary) {
    event.stopPropagation(); // Prevent the click from selecting the list
    list.showMenu = !list.showMenu;
  }

  confirmDeleteList(list: FavoriteListSummary) {
    const confirmed = confirm(`Are you sure you want to delete the list "${list.listName}"?`);
    if (confirmed) {
      // Call API to delete the list
      this.favoriteListService.deleteFavoriteList(list.favListId).subscribe({
        next: (res) => {
          // console.log(res);
          // Remove from favoriteLists
          this.favoriteLists = this.favoriteLists.filter((l) => l.favListId !== res['id']);
          if (this.selectedList?.favListId === list.favListId) {
            this.selectedList = null;
          }
          this.router.navigate(['favlist']);
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

  trackByScene(index: number, scene: Scene): string {
    return scene.sceneId;
  }

  deleteScene(selectedScene: Scene) {
    const confirmed = confirm(`Are you sure you want to delete the scene "${selectedScene.sceneName}"?`);
    if (confirmed && this.selectedList) {
      this.favoriteListService.deleteSceneFromFavoriteList(selectedScene.sceneId, this.selectedList.favListId).subscribe({
        next: (res) => {
          if (res['success']) {
            const index = this.selectedList!.scenes.findIndex(scene => scene.sceneId === selectedScene.sceneId);
            this.selectedList!.scenes = this.selectedList!.scenes.filter(scene => scene.sceneId !== selectedScene.sceneId);
          }
        }
      });
    }
  }
}
