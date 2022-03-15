class ScorePanel {
  // Set the variables to store score and level values and their HTML elements
  private score: number = 0;
  private level: number = 1;
  private scoreEle: HTMLElement;
  private levelEle: HTMLElement;

  // Set the maximum of level and necessary score of levelup
  private maxLevel: number;
  private upScore: number;

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  get scoreValue() {
    return this.score;
  }

  get levelValue() {
    return this.level;
  }

  addScore() {
    this.scoreEle.innerHTML = String(++this.score);
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = String(++this.level);
    }
  }
}

export default ScorePanel;

// const scorePanel = new ScorePanel();
// for (let i = 0; i < 120; i++) {
//   scorePanel.addScore();
// }
