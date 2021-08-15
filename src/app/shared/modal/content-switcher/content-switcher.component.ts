import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content-switcher',
  templateUrl: './content-switcher.component.html',
  styleUrls: ['./content-switcher.component.css']
})
export class ContentSwitcherComponent implements OnInit {
  @Input() contentDict: {[title: string]: string} = {};
  currentPage: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  turnThePage(data: any){
    this.currentPage = data.uniqueId;
  }

  isThePageRightOne(pagesId: string){
    return pagesId == this.currentPage;
  }

  getPageTitles(){
    return Object.keys(this.contentDict)
  }

  getContent(pageTitle: string) {
    return this.contentDict[pageTitle] == undefined ? 'No content received' : this.contentDict[pageTitle]
  }

}
