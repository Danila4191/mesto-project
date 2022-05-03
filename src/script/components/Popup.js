export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonSave = this._popup.querySelector(".form__save-button");
    this._buttonClose = this._popup.querySelector(".popup__close");
    this._form = this._popup.querySelector(".form");
    this._ESC = 27;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlay = this._handleOverlay.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.keyCode === this._ESC) {
      this.close();
    }
  }

  _handleOverlay(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClose.addEventListener("click", () => this.close());
    this._popup.addEventListener("mousedown", this._handleOverlay);
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
    document.removeEventListener("keydown", this._handleEscClose);
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
}
