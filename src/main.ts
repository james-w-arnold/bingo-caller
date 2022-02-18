import "./style.css";
import calls from "./bingo_calls.json";

let previousNumbers: number[] = [];

function retrieveElement(selector: string): Element {
  let el = document.querySelector(selector);
  if (!el) {
    throw new Error(`Unable to retrieve element with selector: ${selector}`);
  }

  return el;
}

function restartGame(): void {
  let currentNumberEl = retrieveElement(".number-section_current-number");
  currentNumberEl.innerHTML = "BINGOOOO";

  let previousSectionDiv = retrieveElement(".previous-section");

  previousSectionDiv.innerHTML = "";
  previousNumbers = [];

  let currentNumberDiv = retrieveElement(".number-section");
  let callEl = currentNumberDiv.lastChild;
  if (callEl) {
    currentNumberDiv.removeChild(callEl);
  }
}

function restartGameAction(): void {
  restartGame();
}

function getNumberAction() {
  let currentNumberDiv = retrieveElement(".number-section");

  let number = generateNumber();

  let currentNumberEl = document.createElement("h1");
  currentNumberEl.classList.add("number-section_current-number");
  currentNumberEl.innerHTML = String(number);

  currentNumberDiv.innerHTML = "";
  currentNumberDiv.appendChild(currentNumberEl);

  let sayingEl = document.createElement("h3");
  sayingEl.innerText = getSaying(number);

  currentNumberDiv.appendChild(sayingEl);
}

function getSaying(num: number): string {
  if (num < 1 || num > 90) {
    throw new Error("Number must be between 1-90");
  }
  //@ts-ignore
  let call = calls[String(num)];

  return call;
}

function generateNumber(): number {
  let newNumber = false;
  let selectedNumber: number = 0;
  while (!newNumber) {
    let numberCandidate = Math.ceil(Math.random() * 90);
    if (!previousNumbers.includes(numberCandidate)) {
      newNumber = true;
      selectedNumber = numberCandidate;
    }
  }

  previousNumbers.push(selectedNumber);
  let previousSection = retrieveElement(".previous-section");

  let prevNumberEl = document.createElement("p");
  prevNumberEl.innerText = String(selectedNumber);
  previousSection.appendChild(prevNumberEl);
  return selectedNumber;
}

document
  .getElementById("control-section_get-number")
  ?.addEventListener("click", () => getNumberAction());
document
  .getElementById("control-section_restart")
  ?.addEventListener("click", () => restartGameAction());
