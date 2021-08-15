import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {
  @Input() contentDict: {[title: string]: string} = {};
  @Output() contentShouldBeSwitched = new EventEmitter<string>();
  currentActiveButton: string = this.getKeysFromDict()[0];
  constructor() { }

  ngOnInit(): void {
  }

  handleButtonWantsToBeActive(data: any){
    this.contentShouldBeSwitched.emit(data)
  }

  getKeysFromDict(){
    return Object.keys(this.contentDict)
  }

  shouldThisButtonBeActive(id: string){
    return id == this.currentActiveButton;
  }

}
