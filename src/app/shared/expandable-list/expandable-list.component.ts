import { Component, OnInit, Input, HostListener} from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


interface SingleOption {
  name: string,
  value: number
}

@Component({
  selector: 'app-expandable-list',
  templateUrl: './expandable-list.component.html',
  styleUrls: ['./expandable-list.component.css']
})

export class ExpandableListComponent implements OnInit {
  @Input() listOfOptions: string[] = [];
  @Input() actualOption: number = 0;
  isListHidden: boolean = true;
  constructor() { }

  @HostListener('click') toggleListVisibility(){
    this.isListHidden = this.isListHidden?false:true;
  }

  ngOnInit(): void {
  }

}
