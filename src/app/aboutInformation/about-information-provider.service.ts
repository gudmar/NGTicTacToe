import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AboutInformationProviderService {

  constructor() { }

  getContent(){
    return `
    <p>
    Hi, my mame is Marek Gudalewicz, and I wrote this in Angular to get familiarity with this framework. This is my first contact with Angular, 
    so I guess there are some areas that need polishing. In this section I would like to describe in a few words how this application works, and why.
    </p>
    <h2>Games that make sense in tic tac toe:</h2>
    <h3>3 x 3 and 3 in row to win:</h3>
    <p>
    Simplest game, winner is not determined by fact, that player begins game, however draw is most likely to appear if oponents are at least
    a bit inteligent. This is a good game instance to teach a child how to play tic tac toe.
    </p>
    <h3>5 in row to win, and at least 7 x 7 board:</h3>
    <p>In this case dead-heat is quite possible, however one player is more likely to overlook something,</p>
    <h3>5 in row, big boards (over 12 x 12):</h3>
    <p>
    In this case more advanted game is more easy to overlook. More advanced game is, more likely for human to lose, as too many things to check. It is easier to win with computer in early stages of game, when human may think of kind of pattern that is not implemented and harder to spot by computer oponent,
    </p>

    <h2>Games not making sense:</h2>
    <h3>3 in row to win on boards larger than 3 x 3:</h3>
    <p>Player begining game will always win (if he is at least a bit inteligent)</p>
    <h3>4 in row on any boards:</b>
    <p>In case 4 x 4 boards game will be a dead-heat In case of larger boards player beginning game will win</p>
    <h3>More than 5 in row to win:</p>
    <p>In this case collecting more than 5 figures in row is more difficult, and oponent can more easly spote creation of figures and destroy our plan. In this case dead-heat will be more probable, and will cause more frustration.</p>

    <h2>That is why this game supports:</h2>
    <ul>
      <li> 3 x 3, 3 in row to win: for all srcean sizes</li>
      <li> 7 x 7, 5 in row to win: for not very small devices</li>
      <li>10 x 10, 5 in row to win (not recommended for small screan devices): for medium devices</li>
      <li>12 x 12, 5 in row to win (not recommended for small screan devices): Only for larger screan sizes</li>
    </ul>
    If screan decreases size (browser inner window changes size), bigger game will not disappear, however there will be no possiblity to 
    chose bigger games. This is to protect end user from frustrations related to use big board on small screan, and need to rewind it somehow.

    <h2>Strategies</h2>
    <p>In tic tac toe a pure function can be used to produce next move. This function would take as argument board, and number of elements in row
    needed to win the game. This means that this function for the same arguments would always produce the same output, and i would have no
    internal state that needs to be remembered between funciton invocations. That is why a slimple algorithm, based on recognising some patterns
    on board could have been applied.<br>
    </p>
    <h4>1) Slice board</h4>
    <p>Let think of a board as an array of vectors. Each vector is a row of board, array of vectors is whole board. Or in similar representation, 
    board would be a 2 dimensioal array. As there are needed a number of elements in row to win, there is a need to seach for a set of patterns
    in all possible directions:
    </p>
    <ul>
      <li>Rows,</li>
      <li>Columns,</li>
      <li>Diagonals starting from top left corner to bottom right corner</li>
      <li>Diagonals starting from bottom left corner to top right corner</li>
    </ul>
    So there needs to be a service taking a board representation, and returning its sliced for further processing.

    <h4>When to stop searching?</h4>
    <p>
      In most cases finding first occurence of pattern is good enough. In some cases most elements of certaing type (circle or cross) will have
      In some cases there needs to be a question answered: is there any empty field left? Last approach could use strategy different that board 
      slicing, as it is more trival. So there will be needed 3 services for searching board:
      <ul>
        <li>Find first slice with a pattern</li>
        <li>Find max number of figures of a type</li>
        <li>Check whole board for an empty field</li>
      </ul>
    </p>

    <h4>Patterns to search for in desired order</h4>
    Let write about patterns in case, there are 5 elements of the same type in row to win. It is easier to imagine, however this 
    game is generic, and all patterns will be detected without mistakes if less or more elements in row need to be found.
    The key is to configure service responsible for searching for component with number of figures missing in pattern, number of 
    gaps in pattern, maximum size of gaps in pattern, and if there are missing figures on one of sides of pattern. Listed parameters are always 
    constant for all numbers of figures in row needed to win.<br>
    For simplicity let suppose own figure is circle <i>O</i> and oponent figure is cross <i>X</i>
    <ol>
      <li>Search for certain winer: add one figure and win: _OOOO_, O_OOO, ...</li>
      <li>Search for situation, where oponent will win within next move: |OOOO_, where | is edge of board,
      <li>Search for situation, where oponent will win within next 2 moves, and where no immediate reaction in folowing turn will result in 
      game lose in next turn: _XXX_, _X_XX_...</li>
    </ol>
    `

  }
}
