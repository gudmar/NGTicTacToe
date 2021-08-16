import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'page-switcher',
  templateUrl: './content-switcher.component.html',
  styleUrls: ['./content-switcher.component.css']
})
export class ContentSwitcherComponent implements OnInit {
  @Input() contentDict: {[title: string]: string} = {};
  currentPage: string = this.getStartingPageTitle(0);
  constructor() {
  }

  ngOnInit(): void {
    this.currentPage = this.getStartingPageTitle(0);
  }

  turnThePage(data: any){
    this.currentPage = data;
    console.log('Turn the page sets to ' + this.currentPage)
  }

  isThePageRightOne(pagesId: string){
    
    return pagesId == this.currentPage;
  }

  getPageTitles(){
    return Object.keys(this.contentDict)
  }

  getStartingPageTitle(pageNr: number){
    let keys = Object.keys(this.contentDict);
    let startingPageTitle = keys[pageNr];
    return startingPageTitle == undefined ? '' : startingPageTitle
  }

  getContent(pageTitle: string) {
    return this.contentDict[pageTitle] == undefined ? 'No content received' : this.contentDict[pageTitle]
  }

}
