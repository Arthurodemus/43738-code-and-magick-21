'use strict';

const WIZARD_FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SECOND_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const ROBE_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const COUNT_OF_WIZARDS = 4;

function getWizards(countOfWizards) {
  const wizards = [];
  for (let i = 0; i < countOfWizards; i++) {
    const fullName = `${getRandomValue(WIZARD_FIRST_NAMES)} ${getRandomValue(WIZARD_SECOND_NAMES)}`;
    wizards.push({name: fullName,
      coatColor: getRandomValue(ROBE_COLORS),
      eyesColor: getRandomValue(EYES_COLORS),
    });
  }
  return wizards;
}

function getRandomValue(arr) {
  return arr[Math.round((arr.length - 1) * Math.random())];
}

function renderWizard(wizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
  return wizardElement;
}

function showElement(element) {
  element.classList.remove(`hidden`);
}

const userDialog = document.querySelector(`.setup`);
showElement(userDialog);

const similarListElement = userDialog.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const wizards = getWizards(COUNT_OF_WIZARDS);

const fragment = document.createDocumentFragment();
wizards.forEach((wizard) => fragment.appendChild(renderWizard(wizard)));
similarListElement.appendChild(fragment);

const similarListBlock = userDialog.querySelector(`.setup-similar`);
showElement(similarListBlock);
