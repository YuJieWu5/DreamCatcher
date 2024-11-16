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
  isLogin: boolean = false;

  constructor(private proxy$: DreamCatcherProxyServiceService) {
    proxy$.getUserInfo(this.userId).subscribe((result: Record<string, any>) => {
      console.log('User Info API Response:', result);
      this.userInfo = result;
      // this.userInfo = {
      //   ...result,
      //   authorization: this.getMembershipLabel(result['authorization'])
      // };
    });
  }

  ngOnInit() {
    const userIdFromCache = localStorage.getItem('userId');
    if (userIdFromCache) {
      this.userId = userIdFromCache;
      this.isLogin = true;
    }
  }

  isObjectEmpty(obj: any): boolean {
    return !obj || Object.keys(obj).length === 0;
  }

  saveUpdate(){
    if (this.isEditing) {
      // Save logic
      // console.log('Saving:', this.userInfo);
      const data = {
        "userName": this.userInfo['userName'],
        "phone": this.userInfo['phone']
      }
      this.proxy$.updateUserInfo(data, this.userId).subscribe(result => {
        console.log('Save successful:', result);
      });
    }
    this.isEditing = !this.isEditing;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing; // Toggle between edit and view mode
  }

  getAvatarUrl(): string {
    if (this.userInfo['authorization'] === 'prime') {
      return 'assets/images/gold-avatar.png';
    }
    return 'assets/images/default-avatar.png';
  }

  getMembershipLabel(authorization: string): string {
    if (authorization === 'prime') {
      return 'Premium Member';
    }
    return 'General User';
  }
}