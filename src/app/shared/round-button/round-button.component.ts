import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'round-button',
  templateUrl: './round-button.component.html',
  styleUrls: ['./round-button.component.css']
})
export class RoundButtonComponent implements OnInit {
  _content: string = '';
  @Input() set content(val: string){ this._content = val;}
  get content() {return this._content[0]}
  constructor() { }

  ngOnInit(): void {
  }

}
