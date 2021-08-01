import { Component, OnInit, Input, Output, HostListener, EventEmitter, Host } from '@angular/core';

@Component({
  selector: 'app-presentation-component',
  templateUrl: './presentation-component.component.html',
  styleUrls: ['./presentation-component.component.css']
})
export class PresentationComponentComponent implements OnInit {
  @Input() caption: string = '';
  @Input() isOnclickEnabled: boolean = true;
  // @Input() arrayOfValues: string[] = [];
  
  @Output() valueClicked: EventEmitter<string> = new EventEmitter();
  // @HostListener('click') ActivatedRoute(){
  //   this.nextValue()
  //   this.valueChanged.emit(this.currentValue);
  // }
  @Input() presentValue: string = '';
  valIterator: any;
  constructor() { }

  // nextValue(){
  //   this.presentValue = this.valIterator.next().value;
  // }

  // nextValueEmit(){
  //   this.nextValue();
  //   this.valueChanged.emit(this.currentValue)
  // }

  onClick(){
    // if (this.isOnclickEnabled) this.nextValueEmit()
    this.valueClicked.emit();
  }

  // nextValueIterator(valArray: string[]){
  //   let nextIndex = 0;
  //   return {
  //     next: function() {
  //       if (nextIndex >= valArray.length) nextIndex = 0;
  //       return {
  //         value: valArray[nextIndex++], 
  //         done: false
  //       }
  //     }
  //   }
  // }

  ngOnInit(): void {
    // this.valIterator = this.nextValueIterator(this.arrayOfValues);
    // this.nextValue();
  }
}
