import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../../service/trip-service';

@Component({
  selector: 'app-tripspage',
  templateUrl: './tripspage.component.html',
  styleUrl: './tripspage.component.css'
})
export class TripspageComponent {
  userId: string;
  isLogin: boolean = false;
  trips: any[] |null = null;

  constructor(private tripService: TripService, private router: Router){
    this.userId = localStorage.getItem('userId') ?? ""
    if (this.userId !== "") {
      this.isLogin = true;
    }
  }

  ngOnInit(): void{
    this.loadTrips();
  }

  loadTrips(){
    this.tripService.getUserTrips(this.userId).subscribe({
      next: (res)=>{
        console.log(res['data']);
        this.trips = res['data'];
      },
      error: (error)=>{
        console.log('Error loading Trips', error);
      }
    });
  }
}
