class Food {
  private element: HTMLElement;

  constructor() {
    this.element = document.getElementById("food")!;
  }

  // Define a method to get food coordinate
  get X() {
    return this.element.offsetLeft;
  }

  get Y() {
    return this.element.offsetTop;
  }

  change() {
    // Generate random coordinate (0,10,20,...,290)
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;
    this.element.style.top = top + "px";
    this.element.style.left = left + "px";
  }
}

export default Food;

// const food = new Food();
// console.log(food.X,food.Y);
// food.change();
// console.log(food.X,food.Y);