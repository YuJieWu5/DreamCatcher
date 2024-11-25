import { Component } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { TripService } from '../../service/trip-service';
import { ActivatedRoute, Params } from '@angular/router';
import { Scene } from '../../model/Scene'

@Component({
  selector: 'app-trip-detailspage',
  templateUrl: './trip-detailspage.component.html',
  styleUrl: './trip-detailspage.component.css',
  // imports: [CdkDropList, CdkDrag]
})
export class TripDetailspageComponent {
  tripId: string;
  tripDetails: Record<string, any>|null = null;
  scenes: Scene[] = [];

  constructor(
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute,
  ){
    this.tripId = route.snapshot.params['id'];
  }

  ngOnInit(){
    this.loadTripData();
  }

  loadTripData(){
    this.tripService.getSelectedTrip(this.tripId).subscribe({
      next:(res)=>{
        this.tripDetails = res;
        const scenes = res['scenes'];
        this.tripService.getScenes(scenes).subscribe({
          next: (res)=>{
            const data = res['data'];
            this.scenes = data;
          }
        })
      },
      error: (error)=>{
        console.log('An error occure', error);
      }
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.scenes, event.previousIndex, event.currentIndex);
  }

  deleteScene(selectedScene: Scene){
    console.log(selectedScene.sceneId);
    const confirmed = confirm(`Are you sure you want to delete the scene "${selectedScene.sceneName}"?`);
    if(confirmed){
      this.tripService.deleteSceneFromTrip(this.tripId, selectedScene.sceneId).subscribe({
        next:(res)=>{
          if(res['success']){
            this.scenes = this.scenes.filter(scene => scene.sceneId !== selectedScene.sceneId);
          }
        }
      });
    }
    
  }
}
