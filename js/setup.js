'use strict';

const WIZARD_FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SECOND_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const ROBE_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const COUNT_OF_WIZARDS = 4;

function getWizards(wizardFirstName, wizardSecondName, robeColors, eyesColors, countOfWizards) {
  let wizards = [];
  for (let i = 0; i < countOfWizards; i++) {
    const fullName = `${getRandomValue(wizardFirstName)} ${getRandomValue(wizardSecondName)}`;
    wizards.push({name: fullName,
      coatColor: getRandomValue(robeColors),
      eyesColor: getRandomValue(eyesColors),
    });
  }
  return wizards;
}

function getRandomValue(arr) {
  return arr[Math.round((arr.length - 1) * Math.random())];
}

function renderWizard(wizard) {
  let wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
  return wizardElement;
}
function showElement(className, from = document) {
  let element = from.querySelector(`.${className}`);
  element.classList.remove(`hidden`);
}

let userDialog = document.querySelector(`.setup`);
showElement(`setup`);

let similarListElement = userDialog.querySelector(`.setup-similar-list`);
let similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

let wizards = getWizards(WIZARD_FIRST_NAMES, WIZARD_SECOND_NAMES, ROBE_COLORS, EYES_COLORS, COUNT_OF_WIZARDS);

let fragment = document.createDocumentFragment();
wizards.forEach((wizard) => fragment.appendChild(renderWizard(wizard)));
similarListElement.appendChild(fragment);

showElement(`setup-similar`, userDialog);
