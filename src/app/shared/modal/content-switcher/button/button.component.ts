import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'navi-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  _isActive: boolean = false;
  @Input() name:string = 'Blank';
  @Input() uniqueId:string = 'someButtonId';
  @Input() set isActive(val: boolean) {
    this._isActive = val;
    this.setClasses();
    console.log(`Button ${this.name} set to ${this.isActive}`)
    console.log(this.classes)
  }
  get isActive() {return this._isActive;}
  @Output() activeStateSet = new EventEmitter<string>();
  classes: {[className: string]: boolean} = {
    'navigation-button': true,
    'center': true,
    'active': this.isActive
  }
  constructor() { }

  ngOnInit(): void {

  }

  @HostListener('click') 
    buttonWasClicked(){
      this.activeStateSet.emit(this.uniqueId)
    }

  setClasses(){
    this.classes = {
      'navigation-button': true,
      'center': true,
      'active': this.isActive
    }
  }

}
