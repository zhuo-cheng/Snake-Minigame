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

  // Set snake coordinate
  set X(value) {

    if (this.X === value) {
      return;
    }

    // Check if the snake hit wall
    if (value < 0 || value > 290) {
      throw new Error("Hit the wall..");
    }

    this.head.style.left = String(value) + "px";
  }

  set Y(value) {

    if (this.Y === value) {
      return;
    }

    // Check if the snake hit wall
    if (value < 0 || value > 290) {
      throw new Error("Game Over.");
    }

    this.head.style.top = String(value) + "px";
  }

  addBodyLength() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }
}

export default Snake;
