import Popup from "./Popup"
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

  getValues() {
    var vars = new Map();
    const imputes = this._popup.querySelectorAll('.form__input');
    [...imputes].forEach((item) => {
      vars.set(item.id, item)
    });
    return vars;
  }
  clearValues() {
    const imputes = this._popup.querySelectorAll('.form__input');
    [...imputes].forEach((item) => {
      item.textContent = '';
    });
  }
  disableButtonSave() {
    this._buttonSave.disabled = "disabled";
    this._buttonSave.classList.add("form__save-button_disabled");
  }

}
