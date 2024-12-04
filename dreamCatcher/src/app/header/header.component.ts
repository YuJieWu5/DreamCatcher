import { Component } from '@angular/core';
import { SearchService } from '../../service/search-service';
import { Router, ActivatedRoute } from '@angular/router';
import { DreamCatcherProxyServiceService } from '../dream-catcher-proxy-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  opened: boolean = false;
  searchQuery: string = '';
  currentRoute = '';
  logoUrl: string = 'assets/images/header-logo.png'; 
  isLogIn: boolean = false;

  constructor(
    private proxy$: DreamCatcherProxyServiceService,
    private searchService: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      this.opened = false;
    });
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.searchService.setSearchQuery(this.searchQuery);
    }
  }

  toggleDrawer() {
    this.opened = !this.opened;
    this.proxy$.getUserInfo().subscribe({
      next: (res) => {
        this.isLogIn = true;
      },
      error: (error) => {
        this.isLogIn = false;
      }
    });
  }
  
  closeDrawer() {
    this.opened = false;
  }

  logOut(){
    this.proxy$.logOut().subscribe({
      next: (response) => {
        console.log('Logged out successfully:', response);
        this.isLogIn = false;
        this.opened = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }
    });
  }
  
}
