import Popup from "./Popup"
import {
  api,
  popupEdit,
  formText,
  formName,
  infoName,
  infoParagraph
} from "../utils/constants"
export default class PopupWithForm extends Popup {
  constructor(popupSelector, nameSelector, textSelector) {
    super(popupSelector);
    this._name = this._popup.querySelector(nameSelector);
    this._text = this._popup.querySelector(textSelector);
  }
  setValues(name, text) {
    this._name.value = name;
    this._text.value = text;
  }

  submit(evt) {
    super.submit(evt);
    api.submitProfileForm({ name: formName.value, about: formText.value })
      .then(() => {
        infoName.textContent = this._name.value;
        infoParagraph.textContent = this._text.value;
        this.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this._buttonSave.textContent = "Сохранить";
      });
  }
}
