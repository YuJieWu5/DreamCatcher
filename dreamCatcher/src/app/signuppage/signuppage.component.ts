import { Component } from '@angular/core';
import { DreamCatcherProxyServiceService } from '../dream-catcher-proxy-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrl: './signuppage.component.css'
})
export class SignuppageComponent {
  userName: string="";
  email: string="";
  password: string="";
  phone: string = "";
  message: string = "";

  constructor(private proxy$: DreamCatcherProxyServiceService, private router: Router){}

  validatePhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Allow only numeric values
    input.value = input.value.replace(/[^0-9]/g, '');
    this.phone = input.value; // Update the model value
  }

  createAccount(){
    this.proxy$.createAccount(this.userName, Number(this.phone), this.email, this.password).subscribe((result: Record<string, any>)=>{
      console.log(result);
      const userId = result && result['id'] ? result['id'] : "";
      if(userId){
        localStorage.setItem('userId', userId);
        this.router.navigate(['/']);
      }else{
        this.message =result['message'];
      }
    })
  }

}
