import { Component } from '@angular/core';
import { DreamCatcherProxyServiceService } from '../dream-catcher-proxy-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent {
  userInfo: Record<string, any> = {}; 
  userId: string = "";
  isEditing: boolean = false;
  isLogin: boolean = false;

  constructor(private proxy$: DreamCatcherProxyServiceService, private router: Router) {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.proxy$.getUserInfo().subscribe({
      next: (res) => {
        console.log('User Info API Response:', res);
        this.userInfo = res;
        this.isLogin = true;
      },
      error: (error) => {
        this.isLogin = false;
        console.log('Error loading user info', error);
      }
    });
  }

  ngOnInit() {
  }

  isObjectEmpty(obj: any): boolean {
    return !obj || Object.keys(obj).length === 0;
  }

  saveUpdate(){
    if (this.isEditing) {
      const data = {
        "userName": this.userInfo['userName'],
        "phone": this.userInfo['phone']
      }
      this.proxy$.updateUserInfo(data).subscribe(result => {
        console.log('Save successful:', result);
      });
    }
    this.isEditing = !this.isEditing;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
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

  upgradeToPrime() {
    this.proxy$.updateUserType({ authorization: 'prime' }).subscribe({
      next: (res) => {
        if (res['success']) {
          alert('Upgrade to Prime successful!');
          this.loadUserInfo();
        }
      },
      error: (error) => {
        console.error('Error upgrading to Prime:', error);
      }
    });
  }

  cancelSubscription() {
    this.proxy$.updateUserType({ authorization: 'general' }).subscribe({
      next: (res) => {
        if (res['success']) {
          alert('Subscription canceled successfully!');
          this.loadUserInfo();
        }
      },
      error: (error) => {
        console.error('Error canceling subscription:', error);
      }
    });
  }
}