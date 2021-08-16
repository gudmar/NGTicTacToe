import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {
  @Input() contentDict: {[title: string]: string} = {};
  @Output() contentShouldBeSwitched = new EventEmitter<string>();
  @Input() currentActiveButton: string = this.getKeysFromDict()[0];
  constructor() { }

  ngOnInit(): void {
  }

  handleButtonWantsToBeActive(data: any){
    this.contentShouldBeSwitched.emit(data)
    this.currentActiveButton = data
    console.log('Navigation menu sets to ' + data)
    // debugger;
  }

  getKeysFromDict(){
    console.log(Object.keys(this.contentDict))
    return Object.keys(this.contentDict)
  }

  shouldThisButtonBeActive(id: string){
    // debugger
    return id == this.currentActiveButton;
  }

}
