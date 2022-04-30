export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonSave = this._popup.querySelector(".form__save-button");
    this._buttonClose = this._popup.querySelector(".popup__close");
    this._form = this._popup.querySelector(".form");
    this._ESC = 27;
  }

  setEventListeners(
    escClose = (evt) => {
      if (evt.keyCode === this._ESC) {
        this.close();
      }
    },

    overlay = (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    }
  ) {
    this._buttonClose.addEventListener("click", () => this.close());
    this._handleEscClose = escClose.bind(this);
    this._handleOverlay = overlay.bind(this);
  }
  addDotesButtonName() {
    if (this._buttonSave != null)
      this._buttonSave.textContent = this._buttonSave.textContent + "...";
  }
  removeDotesFromButtonName() {
    if (this._buttonSave != null)
      this._buttonSave.textContent = this._buttonSave.textContent.replace(
        "...",
        ""
      );
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
  }
  open(validator) {
    if (validator != null) validator.resetValidation();
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener("mousedown", this._handleOverlay);
  }
}

