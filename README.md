# TicTacToe

This is an Angular project. Tests are written for strategies used by computer to winn.

## Games that make sense in tic tac toe:
### 3 x 3 and 3 in row to win:
Simplest game, winner is not determined by fact, that player begins game, however dead-heat is most likely to appear,
### 5 in row to win, and at least 7 x 7 board:
In this case dead-heat is quite possible, however one player is more likely to overlook something,
### 5 in row, big boards (over 12 x 12):
In this case more advanted game is more easy to overlook. More advanced game is, more likely for human to lose, as too many things to check. It is easier to winn with computer in early stages of game, when human may think of kind of pattern that is not implemented and harder to spot by computer oponent,

## Games not making sense:
### 3 in row to win on boards larger than 3 x 3:
Player begining game will always winn (if he is at least a bit inteligent)
### 4 in row on any boards:
In case 4 x 4 boards game will be a dead-heat
In case of larger boards player beginning game will winn
### More than 5 in row to winn:
In this case collecting more than 5 figures in row is more difficult, and oponent can more easly spote creation of figures and destroy our plan. In this case dead-heat will be more probable, and will cause more frustration.

## That is why this game supports:
- 3 x 3, 3 in row to win,
- 7 x 7, 5 in row to win, 
- 10 x 10, 5 in row to winn (not recommended for small screan devices)
- 12 x 12, 5 in row to winn (not recommended for small screan devices)
