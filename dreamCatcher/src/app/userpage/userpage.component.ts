import { Component } from '@angular/core';
import { DreamCatcherProxyServiceService } from '../dream-catcher-proxy-service.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent {
  userInfo: Record<string, any> = {}; 
  userId: string = "a81f83a2-243f-451f-bc4a-fab6538c103d"; // Replace with the current userId
  isEditing: boolean = false;

  constructor(private proxy$: DreamCatcherProxyServiceService) {
    proxy$.getUserInfo(this.userId).subscribe((result: Record<string, any>) => {
      console.log(result);
      this.userInfo = result;
    });
  }

  ngOnInit() {}

  isObjectEmpty(obj: any): boolean {
    return !obj || Object.keys(obj).length === 0;
  }

  toggleEdit() {
    if (this.isEditing) {
      // Save logic
      console.log('Saving:', this.userInfo);
      // Call updateUserInfo with two arguments
      this.proxy$.updateUserInfo(this.userInfo, this.userId).subscribe(result => {
        console.log('Save successful:', result);
      });
    }
    this.isEditing = !this.isEditing;
  }
}