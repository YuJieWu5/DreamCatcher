import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SearchService } from '../../service/search-service'; 
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { environment } from '../../environments/environment';

declare const google: any;

interface Location {
  title: string;
  description: string;
  position: { lat: number; lng: number };
  image: string;
}


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit, AfterViewInit, OnDestroy {
  searchQuery = '';
  private subscription!: Subscription;

  constructor(private searchService: SearchService, public dialog: MatDialog) {}

  locations: Location[] = [
    {
      title: 'Þingvellir National Park',
      description: 'A UNESCO World Heritage Site known for its stunning landscapes and historical significance.',
      position: { lat: 64.2559, lng: -21.1295 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Geysir',
      description: 'Famous for its geothermal activity and the origin of the word "geyser."',
      position: { lat: 64.3136, lng: -20.2995 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Gullfoss Waterfall',
      description: 'A breathtaking waterfall located in the canyon of the Hvítá river.',
      position: { lat: 64.3275, lng: -20.1218 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Reykjavik',
      description: 'The vibrant capital city of Iceland, known for its culture and nightlife.',
      position: { lat: 64.1466, lng: -21.9426 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Blue Lagoon',
      description: 'A famous geothermal spa with milky-blue waters, located in a lava field.',
      position: { lat: 63.8804, lng: -22.4495 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Jökulsárlón Glacier Lagoon',
      description: 'A large glacial lake known for its floating icebergs and stunning views.',
      position: { lat: 64.0485, lng: -16.1785 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Skógafoss Waterfall',
      description: 'A majestic waterfall with a drop of 60 meters, offering a picturesque view.',
      position: { lat: 63.5321, lng: -19.5119 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Vatnajökull National Park',
      description: 'Home to Europe’s largest glacier and a variety of natural wonders.',
      position: { lat: 64.4000, lng: -16.5000 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Akureyri',
      description: 'A charming town in northern Iceland, known for its botanical gardens and cultural sites.',
      position: { lat: 65.6885, lng: -18.1262 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Skaftafell',
      description: 'A nature reserve in Vatnajökull National Park, known for its hiking trails and waterfalls.',
      position: { lat: 64.0173, lng: -16.9750 },
      image: 'https://via.placeholder.com/100x100'
    }
  ];
  

  filteredLocations = [...this.locations];
  map: any;
  showResults = false; 

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

    this.locations.forEach(location => {
      const marker = new google.maps.Marker({
        position: location.position,
        map: this.map,
        title: location.title
      });

      marker.addListener('click', () => {
        this.viewLocation(location);
      });
    });
  }

  viewLocation(location: any) {
    console.log('Viewing location:', location.title);
    this.dialog.open(LocationModalComponent, {
      data: location
    });
  }
}
