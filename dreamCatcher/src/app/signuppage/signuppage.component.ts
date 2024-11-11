import { Component } from '@angular/core';

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

  validatePhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Allow only numeric values
    input.value = input.value.replace(/[^0-9]/g, '');
    this.phone = input.value; // Update the model value
  }

}
