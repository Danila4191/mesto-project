
export default class Popup {
  constructor(popupSelector, validator) {
    this._popup = document.querySelector(popupSelector);
    this._buttonSave = this._popup.querySelector(".form__save-button");
    this._buttonClose = this._popup.querySelector(".popup__close");
    this._ESC = 27;
    this._validator = validator;
  }

  setEventListeners(saveHandler,
    escClose = (evt) => {
      if (evt.keyCode === this._ESC) {
        this.close();
      }
    },
    overlay = (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    }) {
    this._buttonClose.addEventListener('click', () => this.close());
    this._handleEscClose = escClose.bind(this);
    this._handleOverlay = overlay.bind(this);
    if (this._buttonSave != null)
      this._buttonSave.addEventListener('click', saveHandler);

  }
  addDotesButtonName() {
    if (this._buttonSave != null)
      this._buttonSave.textContent = this._buttonSave.textContent + '...';
  }
  removeDotesFromButtonName() {
    if (this._buttonSave != null)
      this._buttonSave.textContent = this._buttonSave.textContent.replace('...', '');
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscKey);
    this._popup.removeEventListener("mousedown", this._handleOverlay);
    if (this._validator != null)
      this._validator.resetValidation();
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscKey);
    this._popup.addEventListener('mousedown', this._handleOverlay);
  }



}

