import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AboutInformationProviderService {

  constructor() { }
  getAboutTicTacToeGameGeneralInfo(){
    return  `
    Tic tac toe <a href = "https://en.wikipedia.org/wiki/Tic-tac-toe" target = "_blank">(see reference)</a> is dated back to 
    acient Egipt, where in 1300 BC it was played on 3 by 3 board. Some variation of this game was also played in the Roman Empire. First print reference
    to a game called tic-tac-toe occured in 1884, but that particular games objective was to birng a pencil down to one of numbers of a set with closed eyes.
    The number hit with the pancil was scored. Name <i>tic-tac-toe</i> might be also deriven from early version lf backgammon, dating back to 1558.
    </br>
    Other historical names of <i>tic-tac-toe</i> are: <i>OXO</i> and <i>Noughts and Crosses</i>, where a word nought refers to nothing, so nothing is 
    a zero. There are also other tic-tac-toe versions, like up to 5 in a row, on a bigger board. This version of this game is referred as
    <i>gomoku</i> in some sources. <br>
    Tic tac toe was often used in early computers word, to demonstarte possibilities of a computer or as one of early video games</i>
    There are some fun facts related to this game. Eg. there are acard games, where one may play tic-tac-toe against a real chicken. This games 
    are also used by cassinos, so those chicken are quite clever :) (of course right move is computed, and chicken is attracted to the button, 
    that needs to be preshed with an invisible for humans light, or a grain)</br>
    There was also an interesting variation of Tic tac toe called <a href = "https://en.wikipedia.org/wiki/Tic-Tac-Dough" target="_blank"><i>tic tac dough</i></a>. It was an american TV show, where each field of board
    had a question related to it. Player was allowed to put his figure on a board no sooner then the right answer was given. If answer was wrong, 
    palyer had to skip turn. 3 same figures in row would win. Middle field, as more strategic, was for a 2 part question.
    <br><br>
    I decided to pick up this game, as it is quite interesting learning subject. It allowed me to practice some design patterns, test services, and
    start my adventure with Angular. 
    `
  }

  getAboutTicTacToeStrategies(){
    return `
    As original game is on 3 x 3 board and 3 same figures in row win, and there are some variaitions of this game on bigger board with 5 in row, 
    there are a lot of different online games in web, one may play. Those variants introduce for example 4 figures in row... But does 4 in a row 
    game really make sence? Why did I chose some game variants, and why I ommited some? Why I did not allow user to define board size and 
    number of figures in a row to win? This would be easy, because strategies classes I wrote are generic, and would work on each board size defined,
    and adding a new board to a game is only one line of code. But there is a reason. Lets think deeper about tic tac toe.<br>
    There are strategies described on wiki pages, but I honestly never looked at them, and I thought of my own algorithm. I am not sure if I am 
    the first one to invent this :), but that does not metter to me, as long as this game works. Let me share strategy used in this game with You:

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
  getAboutMeInfo(){
    return `
      <p>Hello, I am Marek. Marek Gudalewicz, and I wrote this game just to learn front end developement. 
      This is the first thing I wrote ever in Angular. It lacks most of the tests. Of coruse services used for strategies 
      are covered quite well, but UI on the other hand was tested manually. That was on purpose. With Angular I started learning
      Jusmine, that is a framework used to test Angular, and I did not want work to stuck in one place for too long at the begining. 
      </p>
      <p>But that is all about this app for now :). Lets talk more about me.</p>
      <p>I am learning front end developement, because I want to change my occupation for a third tame in my life. So if this is the third time I am 
      going to start career from scratch what did I do so far, and why I cannot stabilize?</p>
      <ul>
        <li>I graduated from automatics and robotics on electronic department in Wrocław, so it is some how programming related.</li>
        <li>After studies, I was interested in indstry, so I got a job at local train factory. I was a production supervisor</li>
        <li>When a great crisis came, I was given an opportunity to change job. I went to a chips factory, where I worked as continuous 
        improvement specialist. That was a great job, as I was given an opportunity to prove myself in many areas, like production management,
        lean manufacturing tools implementation, head of Kaizen system, and even investment project management. But everything that is good 
        finally ends. Moreover I missed technologies a lot. I always enjoyed programming and sitting with computers, so I started learning.. testing
        at first.</li>
      </ul>

  <h3>Why I decided to become a self learner, what are good pros and cons?</h3>
    <p>
    There are possibilities to take a course, make additional studies, pay a lot of money for this, and gain some programming skills this way.
    But only one school guaranteed something: that I will gain job in IT after finishing course. Unfortunately for them, I already had a
    job in IT, I was a software verification engineer at that time. Other downsides of learning at school I found were:</p>
    <ul>
      <li>Software developer has to ba an independent specialist, that is able to solve problems on his own, and that is able to gain knowledge 
      on his own. So learning programming on my own is good start for job preparation. If I can learn on my own, I am a good candidate for 
      software developer. If not, perhaps it is not an occupation for me.
      </li>
      <li>
        Learning how to program takes a lot of time, as one needs to write a lot of code to understand and remember. It is difficult to learn 
        that in 6 months, as many schools offer. Too much knowledge in too short time would make me forget things
      </li>
      <li> Different people will have different paste of understanding things, I was afrayed, that I will pay a lot of money, and not be able to
      understand things in speed introduced in studies</li>
      <li> Taking up studies after work means devoting a lot of time, and I had to choose: my family or studies. That is why I decided my family,
      and self learning, where I can adjust learning speed to current situation</li>
      <li>Finally, noone will inject programming knowledge into someones brain. That knowledge and work needs to be done by a learner, so
      if I have to do whole work on my own, why would I pay a lot of money to a third party :)
    </ul>
    There are of course downsides of self learning like:
    <ul>
      <li>Wasting a lot of time on finding things that need to be learned</li>
      <li>Wasting time to search for information that someone could give in no time</li>
      <li>A menthor could made code revies for me, so I would not commit the same mistakes all over again</li>
      <li>If someone told me about clean code earlier :). This is the most important thing in programming</li>
      <li>If I chose studies, I would learn only things related to direction I chosen, and instead I 
        <ul>
          <li>Picked a little bit of shell</li>
          <li>Wrote 3 small programs in Java</li>
          <li>Wrote some things in Python</li>
          <li>Stopped learning for a couple of mnths, and forgot everything</li>
          <li>Then I made research on job market, and found that JS is one of most desired skills</li>
        </ul>
      </li>
    </ul>
    <p>
      To summ up, combining studies with self learning allows to save time, but one must have really a lot of time to devote
    </p>
    <h3>What did I learn so far</h3>
    There are things, that are not programming related, but are necessary in this job. For example fast typing allows to save a lot of time.
    Moreover working with a version controll system from very begining is helpflull, as it is easy to go back to previous version of code
    in case something went wrong. In case of working with remote repository, like github, there is a backup of my code in case I have a 
    HDD failure. So what things did I learn so far, and what things do I concider important after this learning?
    <ul>
      <li>Fast typing without looking at keyboard</li>
      <li>HTML: not too exciting, but necessary</li>
      <li>CSS: basic knowledge in front end</li>
      <li>JS: no matter what if type script is used, if React, Vue or Angular are used, no matter if Djiango of PHP is in back end,
      JS is always necessary, as TS and React, Vue, Angular are based on JS, and no matter what is used in the back, browser DOM will be 
      manipulated with JS</li>
      <li>Clean code. This needs to be learned with CSS and JS. Without clean code someone may have problems with finishing simpliest 
      application, or widget. There will be problems with CSS, as different selectors will interfere, and it will be difficult to say
      what part of code is responsible for current behavior.</li>
      <li>Testing - as part of clean code, there is TDD approach that is very important</li>
      <li>Design patterns</li>
      <li>Typescript: is important because of Angular I chose to learn.</li>
      <li>Angular - or other framework, but after making chose it is important to get really good familiarity whit learned tool, before
      picking up another.
      </li>
      <li>Jasmine - this is test related, however tests do not have to be done with a framework. Framework just helps with keeping tests clean
      and will help oters to work with them and understand them later</li>
      <li>Some CSS preprocessor like Less, SCSS.</li>
      <li>There are tools like gulp, that is a kind of task manager, and builder for apps, there is also Babel that is helpful in 
      code translation for loder browsers. They are good to know about</li>
    </ul>

    `

  }
  getAboutThisAppInfo(){
    return `
      <h3>Application features</h3>
      <ul>
        <li>Chosing an oponent: computer or other human on the same device</li>
        <li>Selecting a figure You want to play with. Circle always starts game, so in case computer oponent is chosen, switching
        oponent will cause computer to make a move</li>
        <li>Next figure that will make move presentation. Important in case 2 humans are playing against each other. Or a human playes against a chicken :)</li>
        <li>Restart game: this button will not make changes to a board size. Just starts game from begining on current board size</li>
        <li>Board size selection</li>
        <li>Display size awareness: in case screen is getting too small, some bigger boards will disappear from menu. It would be anoying to scroll
        through 12 x 12 board on smartphone, and it would not be appropriate to make too small fields for a touch screen</li>
        <li>When screen is resized, and big board game is started, it will not be interrupted or restarted, but just bigger board options will 
        diappear from menu</li>

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
