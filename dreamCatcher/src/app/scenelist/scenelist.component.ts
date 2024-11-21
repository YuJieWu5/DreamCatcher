import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FavoriteListService } from '../../service/favorite-list-service';
import { FavoriteList, FavoriteListSummary } from '../../model/FavoriteList'
import { Scene } from '../../model/Scene'

@Component({
  selector: 'app-scenelist',
  templateUrl: './scenelist.component.html',
  styleUrl: './scenelist.component.css'
})
export class ScenelistComponent {
  name: string = "";
  listId: string;
  userId: string = "";
  scenesDetails: Scene[] = [];
  scenesList: FavoriteList | null = null;

  constructor(
    private route: ActivatedRoute,
    private favoriteListService: FavoriteListService
  ){
    this.listId = route.snapshot.params['id'];
    const userIdFromCache = localStorage.getItem('userId')
    if (userIdFromCache) {
      this.userId = userIdFromCache;
    }
    this.favoriteListService.getFavoriteList(this.userId , this.listId).subscribe({
      next: (res) =>  {
        
        this.favoriteListService.getScenes(res.scenes).subscribe({
          next: (res) =>  {
            this.scenesDetails = res.data;
          },
          error: (error) => {
            console.error('Error loading scenes:', error);
          }
        });

        this.scenesList = {
          favListId: res.favListId,
          listName: res.listName,
          scenes: this.scenesDetails
        };
      },
      error: (error) => {
        console.error('Error loading scenes:', error);
      }
    })
  }

}
