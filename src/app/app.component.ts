import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSearchActive: boolean = true;

  handleInputTab(whichTab: string) {
    whichTab == 'search' ? this.isSearchActive = true : this.isSearchActive = false;
  }
}
