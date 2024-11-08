import { Component } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css'
})
export class MainpageComponent {
  locations = [
    {
      title: 'Location 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://via.placeholder.com/100x100',
      position: { lat: 64.2559, lng: -21.1295 }
    },
    {
      title: 'Location 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://via.placeholder.com/100x100',
      position: { lat: 64.3136, lng: -20.2995 }
    },
  ];

  ngOnInit() {
    console.log(this.locations);
  }


  viewLocation(location: any) {
    console.log('Viewing location:', location.title);
    // You can add more logic here to display location details
  }
}
