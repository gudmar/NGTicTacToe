import { Component, OnInit, Input, HostListener} from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ConcatSource } from 'webpack-sources';



interface SingleOption {
  name: string,
  value: number
}

@Component({
  selector: 'app-expandable-list',
  templateUrl: './expandable-list.component.html',
  styleUrls: ['./expandable-list.component.css']
})

export class ExpandableListComponent implements OnInit {
  @Input() listOfOptions: string[] = [];
  @Input() actualOption: number = 0;
  isListHidden: boolean = true;

  constructor() { }

  toggleListVisibility(){
    this.isListHidden = this.isListHidden?false:true;
  }

  @HostListener('mouseover') showOptionsList(){
    this.isListHidden = false;
  }
  @HostListener('mouseleave') hideOptionsList(){
    this.isListHidden = true;
  }

  ngOnInit(): void {
  }

  unactivateAllButForThisOption(indexOfOptionToRemainActive:number){
    this.actualOption = indexOfOptionToRemainActive;
  }

  determineIfIsActive(id:number){
    return this.actualOption==id?true:false
  }

}
