import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";

class GameControl {
  food: Food;
  snake: Snake;
  scorePanel: ScorePanel;
  direction: String = "";
  isLive: boolean = true;

  constructor() {
    this.food = new Food();
    this.snake = new Snake();
    this.scorePanel = new ScorePanel();
    this.init();
  }

  // --------------Game initialization, call for game start--------------
  init() {
    // Bind event of key pressing
    // (.bind() for setting "this" of GameControl object rather than document object when calling handler function)
    // document.addEventListener("keydown", this.keydownHandler.bind(this));
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    this.move();
  }
  keydownHandler(event: KeyboardEvent) {
    // Make sure the player presses the appropriate buttons
    // ..............
    this.direction = event.key;
  }

  // -------------Snake movement--------------
  move() {
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
        X += 10;
        break;
    }

    // --------------Check if the snake eat food--------------
    this.checkEat(X, Y);

    // --------------Check if the snake is alive and if not, throw a alear info--------------
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (err: any) {
      alert(err.message);
      this.isLive = false;
    }

    // Set a timer for snake continuous movement and adjust the difficulty according to level value
    this.isLive &&
      setTimeout(
        this.move.bind(this),
        300 - (this.scorePanel.levelValue - 1) * 30
      );
  }

  // -------------- Defination of checkEat function--------------
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      console.log("111");
      this.food.change();
      this.scorePanel.addScore();
      this.snake.addBodyLength();
    }
  }
}

export default GameControl;
