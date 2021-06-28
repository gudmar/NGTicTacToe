import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cross-circle',
  templateUrl: './cross-circle.component.html',
  styleUrls: ['./cross-circle.component.css']
})
export class CrossCircleComponent implements OnInit {
  figure:string = 'circle'
  constructor() { }

  ngOnInit(): void {
  }

}
