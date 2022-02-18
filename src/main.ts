import './style.css'
import calls from './bingo_calls.json'

let previousNumbers: number[] = []

function restartGame(): void {
  previousNumbers = []
}

function restartGameAction(): void {
  let currentNumberEl = document.querySelector('.number-section_current-number')
  if (!currentNumberEl) {
    throw new Error("Unable to get number, cannot find current number element");
  }
  restartGame()
  currentNumberEl.innerHTML = "BINGOOOO"

  let previousSectionDiv = document.querySelector('.previous-section')
  if (!previousSectionDiv) {
    throw new Error("Unable to retrieve revious section div");
  }

  previousSectionDiv.innerHTML = ''
}

function getNumberAction() {
  let currentNumberDiv = document.querySelector('.number-section')
  if (!currentNumberDiv) {
    throw new Error("Unable to get number, cannot find current number element");
  }
  let number = generateNumber()
  let currentNumberEl = document.createElement('h1')
  currentNumberEl.classList.add('number-section_current-number')
  currentNumberEl.innerHTML = String(number)


  currentNumberDiv.innerHTML = ''
  currentNumberDiv.appendChild(currentNumberEl)

  let sayingEl = document.createElement('h3')
  sayingEl.innerText = getSaying(number)
  
  currentNumberDiv.appendChild(sayingEl)
  
}

function getSaying(num: number): string {
  if (num < 1 || num > 90) {
    throw new Error("Number must be between 1-90")
  }
  //@ts-ignore
  let call = calls[String(num)]

  return call
}

function generateNumber(): number {
  let newNumber = false;
  let selectedNumber: number = 0;
  while (!newNumber) {
    let numberCandidate = Math.ceil(Math.random() * 90)
    if (!previousNumbers.includes(numberCandidate)) {
      newNumber = true
      selectedNumber = numberCandidate
    }
  }

  previousNumbers.push(selectedNumber)
  let previousSection = document.querySelector('.previous-section')
  if (!previousSection) {
    throw new Error("Unable to retrieve previous section div")
  }

  let prevNumberEl = document.createElement('p')
  prevNumberEl.innerText = String(selectedNumber)
  previousSection.appendChild(prevNumberEl)
  return selectedNumber;
}

document.getElementById('control-section_get-number')?.addEventListener('click', () => getNumberAction())
document.getElementById('control-section_restart')?.addEventListener('click', () => restartGameAction())
