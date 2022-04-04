import "../src/pages/index.css";
import { enableValidation } from "./script/valid.js";
import {
  submitProfileForm,
  submitAddCardForm,
  closePopup,
  openPopup,
  submitAvatarProfileForm,
} from "./script/modal.js";
import { eventElement, renderCard } from "./script/card.js";
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
  popupImgProfile,
  profileAvatar,
  AvatarProfileSave,
  editProfileButtonSave,
} from "./script/utils.js";
import { getAllCardsApi, userApi } from "./script/api.js";

const infoEditButtonOpen = document.querySelector(".info__edit-button");
const editProfileButtonClose = document.querySelector("#profile_close");
const addImgButtonOpen = document.querySelector(".profile__button");
const addImgButtonClose = document.querySelector("#add_close");
const imgButtonClose = document.querySelector("#img_close");
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const imgProfileClose = document.querySelector("#imgProfileClose");

profileAvatarButton.addEventListener("click", () => {
  openPopup(popupImgProfile);
});
imgProfileClose.addEventListener("click", () => {
  closePopup(popupImgProfile);
});
AvatarProfileSave.addEventListener("click", submitAvatarProfileForm);
editProfileButtonClose.addEventListener("click", () => {
  closePopup(popupEdit);
});
addImgButtonClose.addEventListener("click", () => {
  closePopup(popupAdd);
});
imgButtonClose.addEventListener("click", () => {
  closePopup(popupImg);
});
editProfileButtonSave.addEventListener("click", submitProfileForm);
addImgButtonOpen.addEventListener("click", () => {
  openPopup(popupAdd);
});
addImgButtonSave.addEventListener("click", submitAddCardForm);
infoEditButtonOpen.addEventListener("click", () => {
  formName.value = infoName.textContent;
  formText.value = infoParagraph.textContent;
  openPopup(popupEdit);
});
const validationConfig = {
  inputSelector: ".form__input",
  submitbuttonSelector: ".form__save-button",
  formSelector: ".form",
  inputErrorClass: "form__input_error",
  inactiveButtonClass: "form__save-button_disabled",
};
enableValidation(validationConfig);

getAllCardsApi().then((elements) => {
  elements
    .forEach(function (element) {
      renderCard(element, photos);
    })

});

userApi()
  .then((data) => {
    infoName.textContent = data.name;
    infoParagraph.textContent = data.about;
    profileAvatar.src = data.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

//photos.addEventListener("click", eventElement); старое
