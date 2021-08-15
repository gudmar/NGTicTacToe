import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() name:string = 'Blank';
  @Input() uniqueId:string = 'someButtonId';
  @Input() isActive: boolean = false;
  @Output() activeStateSet = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('click') 
    buttonWasClicked(){
      this.activeStateSet.emit(this.uniqueId)
    }

}
