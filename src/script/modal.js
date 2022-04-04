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
  AvatarProfileSave,
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
    .finally(()=>{editProfileButtonSave.textContent = "Сохранить"});
}
export function submitAvatarProfileForm(evt) {
  evt.preventDefault();
  AvatarProfileSave.textContent = "Сохранить...";
  submitAvatarProfileFormApi({ avatar: formAvatarProfileLink.value })
    .then(() => {
      profileAvatar.src = formAvatarProfileLink.value;
      formAvatarProfileLink.value = "";
      closePopup(popupImgProfile);
      AvatarProfileSave.disabled = "disabled";
      AvatarProfileSave.classList.add("form__save-button_disabled");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{ AvatarProfileSave.textContent = "Сохранить"});
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
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{addImgButtonSave.textContent = "Создать"});

  closePopup(popupAdd);
  formEmptyName.value = "";
  formEmptyLink.value = "";
  addImgButtonSave.disabled = "disabled";
  addImgButtonSave.classList.add("form__save-button_disabled");
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", escClose);
  document.removeEventListener("keydown", overplayClose);
}
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", escClose);

  popup.addEventListener("click", overplayClose);
}
const ESC = 27;
function escClose(evt) {
  if (evt.keyCode === ESC) {
    const openedPopup = document.querySelector(".popup_opened");

    closePopup(openedPopup);
  }
}
function overplayClose(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}
