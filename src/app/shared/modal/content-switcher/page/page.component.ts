import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  @Input() content: string = '';
  @Input() referenceById: string = 'someId';
  constructor() { }

  ngOnInit(): void {
  }

}
