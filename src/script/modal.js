import {
  popupEdit,
  popupAdd,
  formText,
  formName,
  infoName,
  addImgButtonSave,
  infoParagraph,
  closePopup,
} from "../script/utils.js";
import { createCard } from "../script/card.js";

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
  createCard(imgName, imgLink);
  closePopup(popupAdd);
  formEmptyName.value = "";
  formEmptyLink.value = "";
  addImgButtonSave.disabled = "disabled";
  addImgButtonSave.classList.add("form__save-button_disabled");
}
