import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Content } from '@angular/compiler';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  _isVisible = false;
  @Input() contentDict: {[title: string]: string} = {};
  @Input() set isVisible(val: boolean) {this._isVisible  = val;}
  get isVisible() {return this._isVisible}
  @Input() title: string = 'Title';
  // @Input() content: string = 'Here should be something...';
  @Output() modalClosed: EventEmitter<any> = new EventEmitter();
  constructor() { }
  hideModal(){this.isVisible = false; this.modalClosed.emit();}
  ngOnInit(): void {
  }

}

