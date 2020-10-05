'use strict';

let WIZARD_FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
let WIZARD_SECOND_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
let ROBE_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
let EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
let COUNT_OF_WIZARDS = 4;
let wizards = [];

function getRandomWizardObject(wizardFirstName, wizardSecondName, robeColors, eyesColors) {
  return {name: getRandomValue(wizardFirstName) + ` ` + getRandomValue(wizardSecondName),
    coatColor: getRandomValue(robeColors),
    eyesColor: getRandomValue(eyesColors),
  };
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

let userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

let similarListElement = userDialog.querySelector(`.setup-similar-list`);
let similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);


for (let i = 0; i < COUNT_OF_WIZARDS; i++) {
  wizards.push(getRandomWizardObject(WIZARD_FIRST_NAMES, WIZARD_SECOND_NAMES, ROBE_COLORS, EYES_COLORS));
}

let fragment = document.createDocumentFragment();
wizards.forEach((wizard) => fragment.appendChild(renderWizard(wizard)));
similarListElement.appendChild(fragment);

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
