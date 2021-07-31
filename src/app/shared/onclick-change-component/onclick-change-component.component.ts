import { Component, OnInit, Input, Output, HostListener, EventEmitter, Host } from '@angular/core';

@Component({
  selector: 'app-onclick-change-component',
  templateUrl: './onclick-change-component.component.html',
  styleUrls: ['./onclick-change-component.component.css']
})
export class OnclickChangeComponentComponent implements OnInit {
  @Input() caption: string = '';
  @Input() arrayOfValues: string[] = [];
  
  @Output() valueChanged: EventEmitter<string> = new EventEmitter();
  // @HostListener('click') ActivatedRoute(){
  //   this.nextValue()
  //   this.valueChanged.emit(this.currentValue);
  // }
  currentValue: string = '';
  valIterator: any;
  constructor() { }

  nextValue(){
    this.currentValue = this.valIterator.next().value;
  }

  nextValueEmit(){
    this.nextValue();
    this.valueChanged.emit(this.currentValue)
  }

  nextValueIterator(valArray: string[]){
    let nextIndex = 0;
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
    this.valIterator = this.nextValueIterator(this.arrayOfValues);
    this.nextValue();
  }

}
