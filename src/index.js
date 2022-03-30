import "../src/pages/index.css";
import { enableValidation } from "./script/valid.js";
import { submitProfileForm, popupAddSave,closePopup,openPopup  } from "./script/modal.js";
import { eventElement,renderCard, createCard} from "./script/card.js";
import {
  photos,
  popupEdit,
  popupAdd,
  formText,
  formName,
  infoName,
  addImgButtonSave,
  infoParagraph,
  popupImg,
} from "./script/utils.js";
import { initialCards } from "./script/constants.js";

const infoEditButtonOpen = document.querySelector(".info__edit-button");
const editProfileButtonSave = document.querySelector("#profile_save");
const editProfileButtonClose = document.querySelector("#profile_close");
const addImgButtonOpen = document.querySelector(".profile__button");
const addImgButtonClose = document.querySelector("#add_close");
const imgButtonClose = document.querySelector("#img_close");

editProfileButtonClose.addEventListener("click", () => {
  closePopup(popupEdit);
});
addImgButtonClose.addEventListener("click", () => {
  closePopup(popupAdd);
});
imgButtonClose.addEventListener("click", () => {
  closePopup(popupImg);
});
photos.addEventListener("click", eventElement);
editProfileButtonSave.addEventListener("click", submitProfileForm);

infoEditButtonOpen.addEventListener("click", () => {
  formName.value = infoName.textContent;
  formText.value = infoParagraph.textContent;
  openPopup(popupEdit);
});
addImgButtonOpen.addEventListener("click", () => {
  openPopup(popupAdd);
});
addImgButtonSave.addEventListener("click", popupAddSave);
const validationConfig = {
  inputSelector: ".form__input",
  submitbuttonSelector: ".form__save-button",
  formSelector: ".form",
  inputErrorClass: "form__input_error",
  inactiveButtonClass: "form__save-button_disabled",
};
enableValidation(validationConfig);
initialCards.forEach(function (element) {
  const imgName = element.name;
  const imgLink = element.link;
  renderCard(imgName, imgLink,photos);
});

