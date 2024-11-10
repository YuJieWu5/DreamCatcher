import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SearchService } from '../../service/search-service'; 
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { environment } from '../../environments/environment';
import { Scene } from '../../model/Scene';
import { mockSceneList1, mockSceneList2 } from '../../mockdata/data';

declare const google: any;

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit, AfterViewInit, OnDestroy {
  searchQuery = '';
  private subscription!: Subscription;

  constructor(private searchService: SearchService, public dialog: MatDialog) {}

  sceneGroups: Scene[][] = [mockSceneList1, mockSceneList2];
  
  filteredScenes: Scene[] = [];
  map: any;
  showResults = false; 
  markers: any[] = [];

  ngOnInit() {
    this.loadGoogleMapsScript().then(() => {
      this.initializeMap();
    }).catch(err => {
      console.error('Error loading Google Maps script:', err);
    });

    this.subscription = this.searchService.searchObservable$.subscribe(query => {
      this.searchQuery = query;
      this.filterLocations();
    });
  }

  loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined' && google.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (error: any) => reject(error);
      document.body.appendChild(script);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filterLocations() {
    this.clearMarkers();
    this.filteredScenes = this.sceneGroups[0];
    this.filteredScenes.forEach(scene => {
      this.addMarker(scene);
    })
    this.showResults = true 
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  initializeMap() {
    const mapOptions = {
      center: { lat: 64.9631, lng: -19.0208 },
      zoom: 7
    };
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
    const categoryColors = [
      'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    ];
    
    this.sceneGroups.forEach((sceneGroup, index) => {
      sceneGroup.forEach(scene => {
        this.addMarker(scene, categoryColors[index])
      })
    });
  }

  viewLocation(location: any) {
    console.log('Viewing location:', location.title);
    this.dialog.open(LocationModalComponent, {
      data: location
    });
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }
  
  addMarker(scene: Scene, icon: String = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png') {
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(scene.position.lat, scene.position.lng),
      map:  this.map,
      title: scene.title,
      icon: icon
    });
    marker.addListener('click', () => {
      this.viewLocation(scene);
    });
    this.markers.push(marker);
  }
}
