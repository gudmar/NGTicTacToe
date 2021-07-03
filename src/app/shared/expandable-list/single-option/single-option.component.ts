import { Component, OnInit, Output, Input, HostListener, EventEmitter, Host} from '@angular/core';

@Component({
  selector: 'app-single-option',
  templateUrl: './single-option.component.html',
  styleUrls: ['./single-option.component.css']
})
export class SingleOptionComponent implements OnInit {
  @Input() content:string = '';
  @Input() isActive:boolean = false;
  @Output() optionSetToActive: EventEmitter<null> = new EventEmitter();
  @HostListener('click') ActivatedRoute(){
    this.isActive = true;
    this.optionSetToActive.emit();
  }
  constructor() { }

  ngOnInit(): void {
  }

}
