// DonutMaker Class
class DonutMaker {
  constructor() {
    this.donutCount = 0;
    this.autoClickerCount = 0;
    this.autoClickerCost = 100;
    this.autoClickInterval = null; // Track the interval ID for auto clicking
    this.isHovering = false; // Track if the mouse is hovering over the click button
  }

  // Increment donut count with each click
  addDonut() {
    this.donutCount++;
    this.updateDonutCount();
  }

  // Purchase Auto Clicker
  purchaseAutoClicker() {
    if (this.donutCount >= this.autoClickerCost) {
      this.autoClickerCount++;
      this.donutCount -= this.autoClickerCost;
      this.autoClickerCost = Math.ceil(this.autoClickerCost * 1.1);
      this.updateAutoClickerCount();
      this.updateDonutCount();
      this.updateAutoClickerCost();
      this.checkAutoClickActivation(); // Check auto-click activation after purchase
    }
  }

  // Activate Auto Clicker
  activateAutoClicker() {
    if (this.autoClickInterval === null && this.autoClickerCount > 0) {
      this.autoClickInterval = setInterval(() => {
        this.addDonut();
      }, 1000);
    }
  }

  // Deactivate Auto Clicker
  deactivateAutoClicker() {
    clearInterval(this.autoClickInterval);
    this.autoClickInterval = null;
  }

  // Check Auto Click Activation
  checkAutoClickActivation() {
    if (this.isHovering && this.autoClickerCount > 0) {
      this.activateAutoClicker();
    } else {
      this.deactivateAutoClicker();
    }
  }

  // Update the donut count element
  updateDonutCount() {
    const donutCountElement = document.getElementById('donutCount');
    donutCountElement.textContent = `Donuts: ${this.donutCount}`;
  }

  // Update the Auto Clicker count element
  updateAutoClickerCount() {
    const autoClickerCountElement = document.getElementById('autoClickerCount');
    autoClickerCountElement.textContent = `Auto Clickers: ${this.autoClickerCount}`;
  }

  // Update the Auto Clicker cost element
  updateAutoClickerCost() {
    const autoClickerCostElement = document.getElementById('autoClickerCost');
    autoClickerCostElement.textContent = `Cost: ${this.autoClickerCost} donuts`;
  }

  // Reset the game
  resetGame() {
    this.donutCount = 0;
    this.autoClickerCount = 0;
    this.autoClickerCost = 100;
    this.deactivateAutoClicker();
    this.updateDonutCount();
    this.updateAutoClickerCount();
    this.updateAutoClickerCost();
  }
}

// Create an instance of DonutMaker
const donutMaker = new DonutMaker();

// Event listeners
const clickButton = document.getElementById('clickButton');
const autoClickerButton = document.getElementById('autoClickerButton');

clickButton.addEventListener('click', () => {
  donutMaker.addDonut();
});

autoClickerButton.addEventListener('click', () => {
  donutMaker.purchaseAutoClicker();
});

clickButton.addEventListener('mouseover', () => {
  donutMaker.isHovering = true;
  donutMaker.checkAutoClickActivation(); // Check auto-click activation on mouseover
});

clickButton.addEventListener('mouseout', () => {
  donutMaker.isHovering = false;
  donutMaker.checkAutoClickActivation(); // Check auto-click activation on mouseout
});

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', () => {
  donutMaker.resetGame();
});