import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  searchTabActive: boolean = true;

  @Output()
  handleClickOutput = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  handleButtonClick(whichButton: string) {
    whichButton == 'search' ? this.searchTabActive = true : this.searchTabActive = false;
    this.handleClickOutput.emit(whichButton);
  }
}
