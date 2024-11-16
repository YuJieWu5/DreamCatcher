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

  constructor(private proxy$: DreamCatcherProxyServiceService, private router: Router){}

  logIn(){
    const data: Record<string, string> ={
      email: this.email,
      password: this.password
    }

    this.proxy$.userLogin(data).subscribe((result: Record<string, any>)=>{
      console.log(result);
      this.userId = result && result['id'] ? result['id'] : "";
      this.message = result['message'];
      if(this.userId!=""){
        localStorage.setItem('userId', this.userId);
        this.router.navigate(['/']);
      }
    })
  }

  Test(){
    const userIdFromCache = localStorage.getItem('userId');
    if (userIdFromCache) {
      console.log('Retrieved userId:', userIdFromCache);
    }
  }

}
