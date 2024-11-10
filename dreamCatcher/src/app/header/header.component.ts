import { Component } from '@angular/core';
import { SearchService } from '../../service/search-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  opened = false;
  searchQuery = '';
  currentRoute = '';
  logoUrl: string = 'assets/images/header-logo.png'; 

  constructor(
    private searchService: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.searchService.setSearchQuery(this.searchQuery);
    }
  }

  toggleDrawer() {
    this.opened = !this.opened;
  }
  
  closeDrawer() {
    this.opened = false;
  }
  
}
