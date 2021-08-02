import { Component, OnInit, Input, Output, HostListener, EventEmitter, Host } from '@angular/core';

@Component({
  selector: 'app-onclick-change-component',
  templateUrl: './onclick-change-component.component.html',
  styleUrls: ['./onclick-change-component.component.css']
})
export class OnclickChangeComponentComponent implements OnInit {
  @Input() caption: string = '';
  @Input() isOnclickEnabled: boolean = true;
  @Input() arrayOfValues: string[] = [];
  @Input() initialValue: string = '';
  
  @Output() valueChanged: EventEmitter<string> = new EventEmitter();

  currentValue: string = '';
  valIterator: any;
  constructor() { }

  nextValue(){
    this.currentValue = this.valIterator.next().value;
  }

  getInitialValuesIndex(){
    let that = this;
    let isEqualToInitialValue = function(element: string){
      if (element == that.initialValue) return true;
      return false;
    }
    let output = this.arrayOfValues.findIndex(isEqualToInitialValue);
    return output == -1 ? 0 : output;
  }

  nextValueEmit(){
    this.nextValue();
    this.valueChanged.emit(this.currentValue)
  }



  onClick(){
    if (this.isOnclickEnabled) this.nextValueEmit()
  }

  nextValueIterator(valArray: string[], indexOffset: number){
    let nextIndex = indexOffset;
    return {
      next: function() {
        if (nextIndex >= valArray.length) nextIndex = 0;
        return {
          value: valArray[nextIndex++], 
          done: false
        }
      }
    }
  }

  ngOnInit(): void {
    let initialValueIndex = this.getInitialValuesIndex();
    this.valIterator = this.nextValueIterator(this.arrayOfValues, initialValueIndex);
    this.nextValue();
  }

}
