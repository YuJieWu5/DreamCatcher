import { Component } from '@angular/core';
import { SearchService } from '../../service/search-service';
import { Router, ActivatedRoute } from '@angular/router';

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
    const userIdFromCache = localStorage.getItem('userId');
    if (userIdFromCache) {
      this.isLogIn = true;
    }else{
      this.isLogIn = false;
    }
  }
  
  closeDrawer() {
    this.opened = false;
  }

  logOut(){
    localStorage.clear();
    this.opened = false;
  }
  
}
