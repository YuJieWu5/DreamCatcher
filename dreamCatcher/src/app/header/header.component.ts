import { Component } from '@angular/core';
import { SearchService } from '../../service/search-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  opened = false;
  searchQuery = '';

  constructor(private searchService: SearchService) {}

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
