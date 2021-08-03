import { Component, OnInit, Input, Output, HostListener, EventEmitter, Host } from '@angular/core';

@Component({
  selector: 'app-presentation-component',
  templateUrl: './presentation-component.component.html',
  styleUrls: ['./presentation-component.component.css']
})
export class PresentationComponentComponent implements OnInit {
  @Input() caption: string = '';
  @Input() isOnclickEnabled: boolean = false;
  // @Input() arrayOfValues: string[] = [];
  
  @Output() valueClicked: EventEmitter<string> = new EventEmitter();
  _presentValue : string = '';
  @Input() set presentValue(val: string) {
    console.log(`presentation component: settign prsetnValue to ${val}`)
    this._presentValue = val;
    // debugger;
  }
  get presentValue() {return this._presentValue}
  // : string = '';
  valIterator: any;
  constructor() { }

  onClick(){
    this.valueClicked.emit();
  }


  ngOnInit(): void {

  }
}
