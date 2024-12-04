import { Component } from '@angular/core';
import { DreamCatcherProxyServiceService } from '../dream-catcher-proxy-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css',
})
export class LoginpageComponent {
  userId: string = ""; //store it to local catch later
  email: string="";
  password: string="";
  message: string = "";
  userName : string = "";

  constructor(private proxy$: DreamCatcherProxyServiceService, private router: Router){}

}
