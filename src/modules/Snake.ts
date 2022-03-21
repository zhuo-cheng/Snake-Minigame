class Snake {
  element: HTMLElement;
  head: HTMLElement;
  body: HTMLCollection;

  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake>div")!;
    this.body = this.element.getElementsByTagName("div");
  }

  // Get snake coordinate
  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  // Set snake coordinate U-turn
  set X(value) {
    if (this.X === value) {
      return;
    }

    // Check if the snake hit wall
    if (value < 0 || value > 290) {
      throw new Error("Game Over.");
    }

    // Check if the snake did U-turn
    if (this.body[1] && (this.body[1] as HTMLElement).offsetLeft === value) {
      if (value > this.X) {
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }

    this.moveBody();
    this.head.style.left = String(value) + "px";
    this.checkHeadBody();
  }

  set Y(value) {
    if (this.Y === value) {
      return;
    }

    // Check if the snake hit wall
    if (value < 0 || value > 290) {
      throw new Error("Game Over.");
    }

    // Check if the snake did U-turn
    if (this.body[1] && (this.body[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }

    this.moveBody();
    this.head.style.top = String(value) + "px";
    this.checkHeadBody();
  }

  addBody() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }

  moveBody() {
    for (let i = this.body.length - 1; i > 0; i--) {
      let X = (this.body[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.body[i - 1] as HTMLElement).offsetTop;

      (this.body[i] as HTMLElement).style.left = X + "px";
      (this.body[i] as HTMLElement).style.top = Y + "px";
    }
  }

  // Check if the head hit the body
  checkHeadBody() {
    for (let i = 1; i < this.body.length; i++) {
      let oBody_i = this.body[i] as HTMLElement;
      if (this.X === oBody_i.offsetLeft && this.Y === oBody_i.offsetTop) {
        throw new Error("Game Over.");
      }
    }
  }
}

export default Snake;
