import Popup from "./Popup";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, validator, nameSelector, textSelector) {
    super(popupSelector, validator);
    //два поля ниже нужно исправить
    this._name = this._popup.querySelector(nameSelector);
    this._text = this._popup.querySelector(textSelector);
    this._inputes = this._popup.querySelectorAll(".form__input");
  }

  setValues(name, text) {
    this._name.value = name;
    this._text.value = text;
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
   let vars = new Map();
    [... this._inputes].forEach((item) => {
      vars.set(item.id, item);
    });
    return vars;
  /* // Нужно добавить
   this._formValues = {};
   this._inputes.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;*/
  }
}
