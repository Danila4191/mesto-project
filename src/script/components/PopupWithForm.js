import Popup from "./Popup";
export default class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._inputs = this._popup.querySelectorAll(".form__input");
  }

  setValues(data) {
    this._inputs.forEach(input => input.value = data[input.name]);
  }
  close() {
    super.close();
    this._form.reset();
  }
  setEventListeners(saveHandler) {
    super.setEventListeners();
    if (this._buttonSave != null)
      this._form.addEventListener("submit", saveHandler);
  }
  getValues() {
    this._formValues = {};
    this._inputs.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
}
