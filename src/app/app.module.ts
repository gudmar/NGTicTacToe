import { NgModule, TemplateRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { GameControlsComponent } from './game-controls/game-controls.component';
import { ExpandableListComponent } from './shared/expandable-list/expandable-list.component';
import { SingleOptionComponent } from './shared/expandable-list/single-option/single-option.component';
import { OnclickChangeComponentComponent } from './shared/onclick-change-component/onclick-change-component.component';
import { PresentationComponentComponent } from './shared/onclick-change-component/presentation-component/presentation-component.component';
import { WarningMessageComponent } from './shared/warning-message/warning-message.component';
import { RoundButtonComponent } from './shared/round-button/round-button.component';


@NgModule({
  declarations: [
    AppComponent,
    TicTacToeComponent,
    GameControlsComponent,
    ExpandableListComponent,
    SingleOptionComponent,
    OnclickChangeComponentComponent,
    PresentationComponentComponent,
    WarningMessageComponent,
    RoundButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
