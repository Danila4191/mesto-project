export default class Popup {
  constructor(popupSelector, validator) {
    this._popup = document.querySelector(popupSelector);
    this._buttonSave = this._popup.querySelector(".form__save-button");
    this._buttonClose = this._popup.querySelector(".popup__close");
    this._form = this._popup.querySelector(".form");
    this._ESC = 27;
    this._validator = validator;
   //this._handleEscClose = this._handleEscClose.bind(this)// новое
  }
  // Новое еще не работает. Первое закрытие по оверплею после перезагрузки страницы не работает.
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
    this._handleEscClose = escClose.bind(this); //старое
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
   document.removeEventListener('keydown', this._handleEscClose); //новое
    if (this._validator != null) this._validator.resetValidation();
  }
  open() {
    this._popup.classList.add("popup_opened");
  document.addEventListener('keydown', this._handleEscClose); //новое
    this._popup.addEventListener("mousedown", this._handleOverlay);
  }
}

