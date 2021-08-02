import { Component, OnInit, Output, Input, HostListener, EventEmitter} from '@angular/core';
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
  @Input() initialValue: string = '';
  isListHidden: boolean = true;
  @Output() optionChosen: EventEmitter<string> = new EventEmitter();

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
    this.actualOption = this.getInitialValuesIndex();
  }

  unactivateAllButForThisOption(indexOfOptionToRemainActive:number){
    this.actualOption = indexOfOptionToRemainActive;
  }

  passEventToParent(chosenOptionAsString:string){
    this.optionChosen.emit(chosenOptionAsString)
  }

  determineIfIsActive(id:number){
    return this.actualOption==id?true:false
  }

  getInitialValuesIndex(){
    let that = this;
    let isEqualToInitialValue = function(element: string){
      if (element == that.initialValue) return true;
      return false;
    }
    let output = this.listOfOptions.findIndex(isEqualToInitialValue);
    return output == -1 ? 0 : output;
  }
}
