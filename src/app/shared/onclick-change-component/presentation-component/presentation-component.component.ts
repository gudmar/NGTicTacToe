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

  @Input() presentValue: string = '';
  valIterator: any;
  constructor() { }

  onClick(){
    // if (this.isOnclickEnabled) this.nextValueEmit()
    this.valueClicked.emit();
  }


  ngOnInit(): void {
    // this.valIterator = this.nextValueIterator(this.arrayOfValues);
    // this.nextValue();
  }
}
