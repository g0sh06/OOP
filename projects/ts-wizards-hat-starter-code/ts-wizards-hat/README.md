# Object Oriented Programming Case Study Exam (Retake)

| Course | Object Oriented Programming |
|---|---|
| Code | CU75004V1 |
| Date | 25 January 2024 |
| Time | 09:00 |
| Duration | 180 minutes (+extra) |
| Submission | Submit on CodeGrade |

**In case of any discrepancy between the English and Dutch version of the instructions, the English version shall be considered the definitive and authoritative source.**

### Instructions
 - Read the requirements for the game, starting on Page 2.
 - Download the starter .ZIP from Learn.
 - Unzip and load the directory into your Visual Studio Code (or your IDE of choice).
 - Run `npm install`.
 - Create the implementation for the requirements.
 - To compile, run `npm run build` (you can also enter watch mode using `npm run watch`).

### Allowed
 - Use of own laptop 

### NOT Allowed
 - You may not make use of books and/or own notes.
 - You may not make use of the Internet as a source of information / reference.
 - You may not make use of the Internet as a means of communication (e-mail, Teams, Discord, posting to Stack Overflow, and similar).
 - You may not make use of any other means of communication such mobile phones.
 - You may not make use of or communicate with any AI services. In particular, GitHub Copilot may not be installed on your IDE (Visual Studio Code).
 - You may not make use of headphones.
 - You may not make attempt to deobfuscate or reverse engineer any provided code.

### Submission
 - You must submit to the dedicated CodeGrade.
 - Submit ONLY your *.ts files. If you developed your solution using multiple directories, you will need to create a .zip of your files first.
 - You are allowed to hand in multiple times during the exam. 
 - CodeGrade will only test whether you code compiles successfully and the output from your ESLint. The rest of your exam will be assessed manually.
 - The last code you handed in will be considered your final submission and will be graded.
 - The assessment rubric can be found on Page 4.

<div class="page"/>

# Wizard's Hat
> The poor wizard Mordak has lost all his gems again, and the skulls are after them.

Using your keyboard, you control the wizard's hat. Around you, gems and skulls will appear and disappear. Capture all the gems and avoid the skulls.

## Demonstration

You can play a demonstration at: [https://hz-hbo-ict.github.io/ts-wizards-hat/](https://hz-hbo-ict.github.io/ts-wizards-hat/)

## Technical Details

 - A conceptual class diagram is provided for you to start. Make good use of OOP-princples when completing the implementation.

 - You may not alter the provided `GameLoop.ts`, `CanvasRenderer.ts`, or `KeyListener.ts`.

 - The player (![](./assets/player.png)) starts in the middle of the screen move left, right, up, and down using the keyboard.

 - The player's score starts at 0.

 - Randomly between 100ms and 200ms (milliseconds) either a new gem or skull will appear on the screen, at a random location. An gem has 40% chance of appearing and skull 60% chance of appearing.

 - After a certain amount of time, the gem or skull will disappear.

 - There are 3 types of gems. When the player catch a gem, it will add to their score. Each gem has a different score value, chance of appearing and time it will stay on screen:
    1. Gem Blue ![](./assets/gemBlue.png): 1 point, 50% chance of appearing, will stay on screen 2 - 9 seconds
    2. Gem Green ![](./assets/gemGreen.png): 3 points, 30% chance of appearing, will stay on screen 2 - 7 seconds
    3. Gem Red ![](./assets/gemRed.png): 5 points, 20% chance of appearing, will stay on screen 2 - 4 seconds

 - There are 3 types of skulls. When the player catch a skull, it will deduct from their score. Each skull has a different score value, chance of appearing and time it will stay on screen:
    1. Skull Blue ![](./assets/skullBlue.png): 10 point, 50% chance of appearing, will stay on screen 3 - 5 seconds
    2. Skull Green ![](./assets/skullGreen.png): 20 points, 30% chance of appearing, will stay on screen 3 - 7 seconds
    3. Skull Red ![](./assets/skullRed.png): 30 points, 20% chance of appearing, will stay on screen 3 - 10 seconds

 - The player is said to have "caught" a gem or a skull when the images collide. *Pseudocode for collision detection is in the digital version of these instructions.*

```
Pseudocode for Collision Detection
item.X + item.width >= player.X
&& item.X <= player.X + player.width
&& item.Y + item.height >= player.Y
&& item.Y <= player.Y + player.height
```

 - The game is over when the player's score is less than 0, or when the player has caught 3 or more skulls.

<div class="page"/>

### Conceptual Class Diagram
![](./docs/classdiagram.svg)

*You may deviate from this given diagram, as long as you maintain good Object Oriented Programming principles.*

## Advanced Feature
**Do not spend any time on the advanced feature if your main features are not yet completed!**

The Potion (![](./assets/potion.png)) will destroy all the skulls on the screen. The Potion has a 5% chance of appearing. The Potion starts at a random place on the screen, and will move any any direction at 0.2px per ms. If the player catches the Potion, all skulls on the screen will disappear. The value of each skull will be added (instead of subtracted) to the player's score. The counter of the number of skulls the player caught will also be reset to 0.

You will have to extend the design of the classes to implement the advanced feature. You do not need to hand this in.

<div class="page"/>

# Marking Rubric

**Marking Threshold:** Code must compile without any errors from the TypeScript compiler. If the code does not compile, student will be awarded a 1.0. If, at the assessor's discretion, the compilation error can be fixed by spending less than 30 seconds, marking can continue.

| No  | Criterion | Insufficient | Sufficient | Good | Excellent |
|:-:|---|---|---|---|---|
| 0  | Code Compiles | Code does not compile. (0 pnts) | Code must compile without any errors from the TypeScript compiler. (10 pnts) |  |  |
| 1 | Code Quality & Style | Style and quality deficient. ESLint errors are present. (0 pnts) | Types are properly used for variables, attributes and methods. Some ESLint warnings (less than 5). (5 pnts) | Types are properly used. No ESLint warnings, however comments and documentation insufficient. (7 pnts) | Types are properly used. No ESLint problems. Good quality and style, including complete JSDocs. (10 pnts) |
| 2 | Object Oriented Programming Principles & Concepts    | Most classes missing. Implementation of most class members (attributes and methods) are absent. (0 pnts)    | Basic classes for functionality of game present. All required  class members are implemented. (10 pnts) | Most classes required for functional game are present with appropriate use of composition. Abstract classes are absent. Most class members appropriately communicate. (15 pnts)   | Classes required for functional game (inherited and abstract) are present with good use of inheritance and composition. Polymorphism appropriately used to reduce code duplication (30 pnts) |
| 3 | Game Functionality | Game has little to no functionality. (0 pnts) | Game is playable but not complete. Functionality is absent. (20 pnts) | Game is fundamentally complete, but not all features are present. (30 pnts) | Game functions exactly as per requirements. (40 pnts) |
| 4 | Advanced Feature | Advanced feature not attempted. (0 pnts) | Traces of advanced feature present, but not functional. (3 pnts) | Advanced feature functional, but incomplete. (6 pnts) | Advanced feature functions exactly as per requirements. (10 pnts) |

## Credits
 - https://www.freepik.com/free-vector/game-icons-big-set-cartoon-skull-coin-star-xp-gold-cup-clock-chest-medal-money-sack-crown-lock-key-magnet-shield-witch-potion-gift-box-crystal-parchment-vector-ui-elements_24315604.htm
 - https://www.freepik.com/free-vector/magic-school-classroom-with-cauldron-night_16646800.htm
 - https://www.freepik.com/free-vector/witch-magician-hats-halloween-party-costume_36152413.htm