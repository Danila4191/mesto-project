import {
  popupEdit,
  popupAdd,
  formText,
  formName,
  infoName,
  addImgButtonSave,
  infoParagraph,
  photos,
  popupImgProfile,
  formAvatarProfileLink,
  profileAvatar,
  avatarProfileSave,
  editProfileButtonSave,
} from "../script/utils.js";
import { renderCard } from "../script/card.js";
import {
  submitAddCardFormApi,
  submitProfileFormApi,
  submitAvatarProfileFormApi,
} from "../script/api.js";

export function submitProfileForm(evt) {
  evt.preventDefault();
  editProfileButtonSave.textContent = "Сохранить...";
  submitProfileFormApi({ name: formName.value, about: formText.value })
    .then(() => {
      infoName.textContent = formName.value;
      infoParagraph.textContent = formText.value;
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfileButtonSave.textContent = "Сохранить";
    });
}
export function submitAvatarProfileForm(evt) {
  evt.preventDefault();
  avatarProfileSave.textContent = "Сохранить...";
  submitAvatarProfileFormApi({ avatar: formAvatarProfileLink.value })
    .then(() => {
      profileAvatar.src = formAvatarProfileLink.value;
      formAvatarProfileLink.value = "";
      closePopup(popupImgProfile);
      avatarProfileSave.disabled = "disabled";
      avatarProfileSave.classList.add("form__save-button_disabled");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarProfileSave.textContent = "Сохранить";
    });
}
export function submitAddCardForm(evt) {
  evt.preventDefault();
  addImgButtonSave.textContent = "Создать...";
  submitAddCardFormApi({
    name: formEmptyName.value,
    link: formEmptyLink.value,
  })
    .then((dataFromServer) => {
      renderCard(dataFromServer, photos);
      closePopup(popupAdd);
      formEmptyName.value = "";
      formEmptyLink.value = "";
      addImgButtonSave.disabled = "disabled";
      addImgButtonSave.classList.add("form__save-button_disabled");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addImgButtonSave.textContent = "Создать";
    });
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKey);
  popup.removeEventListener("mousedown", handleOverlay);
}
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKey);

  popup.addEventListener('mousedown', handleOverlay);
}
const ESC = 27;
function handleEscKey(evt) {
  if (evt.keyCode === ESC) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
function handleOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}
