import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AboutInformationProviderService {

  constructor() { }
  getAboutTicTacToeGameGeneralInfo(){
    return  `
    <p>
    Tic-tac-toe <a href = "https://en.wikipedia.org/wiki/Tic-tac-toe" target = "_blank">(see reference)</a> is dated back to 
    ancient Egypt, where in 1300 BC it was played on 3 by 3 board. Some variations of this game were also played in the Roman Empire. 
    The First print reference
    to a game called tic-tac-toe occurred in 1884, but that particular games objective was to bring a pencil down to one of the 
    numbers of a set with closed eyes.
    The number hit with the pencil was scored. Name <i>tic-tac-toe</i> might be also derived from an early version of backgammon, 
    dating back to 1558.
    </p>
    <p>
    Other historical names of <i>tic-tac-toe</i> are: <i>OXO</i> and <i>Noughts and Crosses</i>, where a word nought refers to nothing, so nothing is 
    a zero. There are other tic-tac-toe versions, like up to 5 in a row, on a bigger board. This version of this game is referred as
    <i>gomoku</i> in some sources.
    </p>
    <p>
    Tic-tac-toe was often used in early computers word, to demonstrate possibilities of a computer or as one of early video games</i>
    There are some fun facts related to this game. For example there are acarde games, where one may play tic-tac-toe against a real 
    chicken. These games 
    are also used by casinos, so those chickens are quite clever &#x1F600; (of course right move is computed, and a chicken is 
    attracted to the button, that needs to be preseed with an invisible for humans light, or a grain)
    </p>
    <p>
    There was also an interesting variation of Tic-tac-toe called <a href = "https://en.wikipedia.org/wiki/Tic-Tac-Dough" target="_blank"><i>tic-tac-dough</i></a>. 
    It was an American TV show, where each field of board
    had a question related to it. Player was allowed to put his figure on a board no sooner than the right answer was given. If the 
    answer was wrong, the player had to skip a turn. 3 same figures in row would win. The middle field, as more strategic, was for a 2 part 
    question.
    </p>
    <br>
    <p>
    I decided to pick up this game, as it is quite an interesting learning subject. It allowed me to practise some design patterns, 
    test services, and start my adventure with Angular. 
    </p>
    `
  }

  getAboutTicTacToeStrategies(){
    return `
    As original game is on 3 x 3 board and 3 same figures in row win, and there are some variations of this game on a bigger board 
    with 5 in row, there are a lot of different online games in web, one may play. Those variants introduce for example 4 figures in 
    row... But does 4 in a row 
    game really make sense? Why did I choose some game variants, and why I did omit some? Why I did not allow a user to define a board 
    size and a number of figures in a row to win? This would be easy, because strategies classes I wrote are generic, and would work 
    on each board size defined, and adding a new board to a game is only one line of code. But there is a reason. Let's think deeper 
    about tic-tac-toe.<br>
    There are strategies described on wiki pages, but I honestly never looked at them, and I thought of my own algorithm. I am not 
    sure if I am the first one to invent this &#x1F600;, but that does not matter to me, as long as this game works. Let me share the strategy 
    used in this game with you:

    <h2>Games that make sense in tic-tac-toe:</h2>
    <h3>3 x 3 and 3 in a row to win:</h3>
    <p>
    The simplest game, winner is not determined by the fact, that a player begins the game, however, draw is most likely to appear if 
    opponents are at least a bit intelligent. This is a good example of a game instance to teach a child how to play tic-tac-toe.
    </p>
    <h3>5 in row to win, and at least 7 x 7 board:</h3>
    <p>In this case dead-heat is quite possible, however one player is more likely to overlook something,</p>
    <h3>5 in row, big boards (over 12 x 12):</h3>
    <p>
    In this case more advanced game is easier to overlook. More advanced game is, more likely for human to lose, as there are too many 
    things to check. It is easier to win with computer in early stages of the game, when a human may think of a kind of pattern that 
    is not implemented and harder to spot by computer opponent,
    </p>

    <h2>Games not making sense:</h2>
    <h3>3 in row to win on boards larger than 3 x 3:</h3>
    <p>Player beginning the game will always win (if he is at least a bit intelligent)</p>
    <h3>4 in row on any boards:</h3>
    <p>In case 4 x 4 boards game will be a dead-heat In case of larger boards player beginning the game will win</p>
    <h3>More than 5 in row to win:</h3>
    <p>In this case collecting more than 5 figures in row is more difficult, and the opponent can more easily spot creation of figures 
    and destroy our plan. In this case dead-heat will be more probable, and will cause more frustration.</p>

    <h2>That is why this game supports:</h2>
    <ul>
      <li> 3 x 3, 3 in row to win: for all srceen sizes</li>
      <li> 7 x 7, 5 in row to win: for not very small devices</li>
      <li>10 x 10, 5 in row to win (not recommended for small screen devices): for medium devices</li>
      <li>12 x 12, 5 in row to win (not recommended for small screen devices): Only for larger screen sizes</li>
    </ul>
    If screen decreases its size (browser inner window changes size), bigger game will not disappear, however there will be no 
    possiblity to choose bigger games. 
    This is to protect end user from frustrations related to using a big board on a small screen, and a need to rewind it somehow.

    <h2>Strategies</h2>
    <p>In tic-tac-toe a pure function can be used to produce the next move. This function would take as argument board, and 
    number of elements in row needed to win the game. This means that this function for the same arguments would always produce the 
    same output, and i would have no
    internal state that needs to be remembered between function invocations. That is why a simple algorithm, based on recognizing some 
    patterns on board could have been applied.<br>
    </p>
    <h4>1) Slice board</h4>
    <p>Let us think of a board as an array of vectors. Each vector is a row of board, array of vectors is whole board. Or in similar 
    representation, board would be a 2 dimensional array. As there are needed a number of elements in row to win, there is a need to 
    search for a set of patterns in all possible directions:
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
      In most cases finding first occurrence of pattern is good enough. In some cases most elements of certain type (circle or cross) 
      will have. In some cases there needs to be a question answered: is there any empty field left? The last approach could use a 
      strategy different than board slicing, as it is more trivial. So there 3 services for searching the board will be needed:
      <ul>
        <li>Find the first slice with a pattern</li>
        <li>Find max number of figures of a type</li>
        <li>Check the whole board for an empty field</li>
      </ul>
    </p>

    <h4>Patterns to search for in desired order</h4>
    Let us write about patterns in a case, there are 5 elements of the same type in row to win. It is easier to imagine, however this 
    game is generic, and all patterns will be detected without mistakes if fewer or more elements in row need to be found.
    The key is to configure the service responsible for searching for component with a number of figures missing in a pattern, 
    number of gaps in a pattern, the maximum size of gaps in a pattern, and if there are missing figures on one of sides of a pattern. 
    Listed parameters are always constant for all numbers of figures in row needed to win.<br>
    For simplicity let us suppose our figure is a circle <i>O</i> and opponent figure is a cross <i>X</i>
    <ol>
      <li>Search for a certain winner: add one figure and win: _OOOO_, O_OOO, ...</li>
      <li>Search for a situation, where your opponent will win within next move: |OOOO_, where | is the edge of the board,
      <li>Search for a situation, where the opponent will win within next 2 moves, and where no immediate reaction in following 
      turn will result in game lose in next turn: _XXX_, _X_XX_...</li>
    </ol>
    `
  }
  getAboutMeInfo(){
    return `
      <p>Hello, my name is Marek Gudalewicz, and I wrote this game just to learn front end development. 
      This is the first thing I wrote ever in Angular.
      </p>
      <p>I am learning, because I want to change my occupation for a third tame in my life. At present, I work for the
      telecommunication industry, and I test software for 5G gNBs, but I prefer to write, and create something then 
      just testing.</p>
      <p>Before IT, I did something completely different: I worked as a continuous improvement specialist. Besides implementing 
      lean manufacturing tools in a food factory, I implemented a KPI measurement system, an <abbr title="Overall Equipment Effectiveness"
      >OEE</abbr> measurement system, did some investment projects, was a trainer, lead Kaizen system, etc.</p>
      <p>I started my career path as a production foreman in the train production plant.</p>
      <p>I graduated from the Wrocław University of science, electronic department. So at least this was related to 
      programming &#x1F600;.</p>
      <p>Unfortunately, despite I always enjoyed programming, after years it turned out, that studies did not prepare us to 
      become a software developer at all. We had a lot of programming activities, but the most important thing: clean code,
      was not mentioned at all. That is why after years I had to learn a lot. So far: </p>
      <ul>
        <li>HTML,</li>
        <li>CSS, and some preprocesors</li>,
        <li>JS,</li>
        <li>some TS,</li>
        <li>some Angular,</li>
        <li>some React,</li>
        <li>clean code,</li>
        <li>some things about design patterns</li>
      </ul>
      <p>Please visit <a href="https://gudmar.github.io/myProjects/aboutMe" target="_blank">my web page</a> to learn more.
      Animation may be skipped by clicking on it.

    `

  }
  getAboutThisAppInfo(){
    return `
      <h3>Application features</h3>
      <ul>
        <li>Choosing an opponent: a computer or another human on the same machine,</li>
        <li>Selecting a figure You want to play with. A circle always starts the game, so in case when a computer opponent is chosen, 
        switching an opponent will cause a computer to make a move</li>
        <li>Next figure who will make a move presentation. Important in case of 2 humans are playing against each other. 
        Or a human plays against a chicken &#x1F600;:)</li>
        <li>Restart the game: this button will not make changes to a board size. Just starts the game from the beginning on a current 
        board size</li>
        <li>Board size selection</li>
        <li>Display size awareness: in case a screen is getting too small, some bigger boards will disappear from menu. It would be 
        annoying to scroll
        through 12 x 12 board on smartphone, and it would not be appropriate to make too small fields for a touch screen</li>
        <li>When a screen is resized, and a big board game is started, it will not be interrupted or restarted, but just bigger board 
        options will disappear from the menu</li>

      </ul>
    `
  }

  getContent(){
    return {
      'Game History': this.getAboutTicTacToeGameGeneralInfo(),
      'Strategies'  : this.getAboutTicTacToeStrategies(),
      'Features'    : this.getAboutThisAppInfo(),
      'About me'    : this.getAboutMeInfo()
    }

  }
}
