import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../service/trip-service';
import { Trip, TripSummary, TripRoute } from '../../model/Trip';
import { Scene } from '../../model/Scene';
import { MatDialog } from '@angular/material/dialog';
import { CreateListDialogComponent } from '../create-list-dialog/create-list-dialog.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { loadGoogleMapsScript } from '../mainpage/mainpage.component'
declare const google: any;

@Component({
  selector: 'app-tripspage',
  templateUrl: './tripspage.component.html',
  styleUrls: ['./tripspage.component.css']
})
export class TripspageComponent {
  userId: string;
  isLogin: boolean = false;
  tripList: TripSummary[] = [];
  selectedTrip: Trip | null = null;
  isAutoGenerate: boolean = true; 

  constructor(
    private dialog: MatDialog,
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {
    this.userId = localStorage.getItem('userId') ?? '';
    if (this.userId !== '') {
      this.isLogin = true;
    }
  }

  ngOnInit(): void {
    loadGoogleMapsScript().then(() => {
      this.loadTrips();
      this.loadTripData();
    }).catch(err => {
      console.error('Error loading Google Maps script:', err);
    });
  }

  loadTrips() {
    this.tripService.getUserTrips(this.userId).subscribe({
      next: (res) => {
        this.tripList = res.data;
      },
      error: (error) => {
        console.log('Error loading Trips', error);
      }
    });
  }

  selectTrip(trip: TripSummary) {
    if (trip.scenes) {
      this.router.navigate(['trip', trip.tripId]);
    }
  }

  confirmDeleteTrip(trip: TripSummary) {
    const confirmed = confirm(`Are you sure you want to delete the list "${trip.tripName}"?`);
    if (confirmed) {
      this.tripService.deleteTrip(trip.tripId).subscribe({
        next: (res) => {
          this.tripList = this.tripList.filter((l) => l.tripId !== res['id']);
          if (this.selectedTrip?.tripId === trip.tripId) {
            this.selectedTrip = null;
          }
          this.router.navigate(['trip']);
        },
        error: (error) => {
          console.error('Error deleting trip:', error);
        }
      });
    }
  }

  openTripMenu(event: MouseEvent, trip: TripSummary) {
    event.stopPropagation();
    trip.showMenu = !trip.showMenu;
  }

  openCreateListDialog() {
    const dialogRef = this.dialog.open(CreateListDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: { name: string }) => {
      if (result) {
        const duplicate = this.tripList.some((trip) => trip.tripName === result.name);
        if (duplicate) {
          alert('Trip name already exists. Please choose a different name.');
        } else {
          this.tripService.createTrip(this.userId, result.name).subscribe({
            next: (res) => {
              if (res['success']) {
                this.loadTrips();
              }
            },
            error: (error) => {
              console.error('Error creating favorite list:', error);
            }
          });
        }
      }
    });
  }

  loadTripData() {
    this.route.params.subscribe((params) => {
      const tripId = params['id'];
      if (tripId) {
        this.tripService.getSelectedTrip(tripId).subscribe({
          next: (res) => {
            const trip = res['data'];
            const scenes = trip.scenes;
            this.tripService.getScenes(scenes).subscribe({
              next: (res) => {
                const scenes = res['data'];
                let routes: TripRoute[] = trip.routes || [];
                if (routes.length !== scenes.length - 1) {
                  routes = [];
                  for (let i = 0; i < scenes.length - 1; i++) {
                    routes.push({
                      transportation: 'driving',
                      timeInSeconds: 0,
                      distance: 0
                    });
                  }
                }
                const selectedTrip: Trip = {
                  tripId: trip.tripId,
                  tripName: trip.tripName,
                  scenes: scenes,
                  routes: routes
                };
                this.selectedTrip = selectedTrip;
                if (this.isAutoGenerate) {
                  this.generateRoutes();
                }
              }
            });
          },
          error: (error) => {
            console.log('An error occurred', error);
          }
        });
      }
    });
  }

  drop(event: CdkDragDrop<Scene[]>) {
    if (this.selectedTrip) {
      moveItemInArray(this.selectedTrip.scenes, event.previousIndex, event.currentIndex);
      if (this.isAutoGenerate) {
        this.generateRoutes();
      } else {
        const indicesToClear = [];
        if (event.currentIndex > 0) {
          indicesToClear.push(event.currentIndex - 1);
        }
        if (event.currentIndex < this.selectedTrip.scenes.length - 1) {
          indicesToClear.push(event.currentIndex);
        }
        indicesToClear.forEach((index) => {
          this.selectedTrip!.routes[index] = {
            transportation: 'walking',
            timeInSeconds: 0,
            distance: 0
          };
        });
      }
    }
  }

  deleteScene(selectedScene: Scene) {
    const confirmed = confirm(`Are you sure you want to delete the scene "${selectedScene.sceneName}"?`);
    if (confirmed && this.selectedTrip) {
      this.tripService.deleteSceneFromTrip(this.selectedTrip.tripId, selectedScene.sceneId).subscribe({
        next: (res) => {
          if (res['success']) {
            const index = this.selectedTrip!.scenes.findIndex(scene => scene.sceneId === selectedScene.sceneId);
            this.selectedTrip!.scenes = this.selectedTrip!.scenes.filter(scene => scene.sceneId !== selectedScene.sceneId);
            if (index < this.selectedTrip!.routes.length) {
              this.selectedTrip!.routes.splice(index, 1);
            } else if (index > 0) {
              this.selectedTrip!.routes.splice(index - 1, 1);
            }
            if (this.isAutoGenerate) {
              this.generateRoutes();
            }
          }
        }
      });
    }
  }

  saveTrip() {
    // if (this.selectedTrip) {
    //   this.tripService.saveTrip(this.selectedTrip).subscribe({
    //     next: (res) => {
    //       if (res['success']) {
    //         alert('Trip saved successfully');
    //       }
    //     },
    //     error: (error) => {
    //       console.error('Error saving trip:', error);
    //     }
    //   });
    // }
  }

  trackByScene(index: number, scene: Scene): string {
    return scene.sceneId;
  }

  getRouteDetails(index: number): void {
    if (this.selectedTrip) {
      const sceneA = this.selectedTrip.scenes[index];
      const sceneB = this.selectedTrip.scenes[index + 1];
      const mode = this.selectedTrip.routes[index].transportation.toUpperCase();

      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: { lat: sceneA.lat, lng: sceneA.lng },
          destination: { lat: sceneB.lat, lng: sceneB.lng },
          travelMode: mode,
        },
        (response: any, status: string) => {
          if (status === 'OK') {
            const route = response.routes[0].legs[0];
            this.selectedTrip!.routes[index].timeInSeconds = route.duration.value;
            this.selectedTrip!.routes[index].distance = route.distance.value;
            this.cdRef.detectChanges();
          } else {
            console.error('Directions request failed due to ' + status);
          }
        }
      );
    }
  }

  generateRoutes(): void {
    if (this.selectedTrip) {
      for (let i = 0; i < this.selectedTrip.scenes.length - 1; i++) {
        this.getRouteDetails(i);
      }
    }
  }

  onTransportationChange(index: number): void {
    if (this.isAutoGenerate && this.selectedTrip) {
      this.getRouteDetails(index);
    }
  }
}
