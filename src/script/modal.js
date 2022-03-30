import {
  popupEdit,
  popupAdd,
  formText,
  formName,
  infoName,
  addImgButtonSave,
  infoParagraph,
  photos
} from "../script/utils.js";
import { renderCard } from "../script/card.js";

export function submitProfileForm(evt) {
  evt.preventDefault();
  infoName.textContent = formName.value;
  infoParagraph.textContent = formText.value;
  closePopup(popupEdit);
}
export function popupAddSave(evt) {
  evt.preventDefault();
  const imgName = formEmptyName.value;
  const imgLink = formEmptyLink.value;
  renderCard(imgName, imgLink,photos);
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
  popup.addEventListener("click",  overplayClose);
}
const ESC = 27
function escClose(evt) {
  if (evt.keyCode === ESC) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
function overplayClose(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}
