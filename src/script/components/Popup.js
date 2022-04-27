
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonSave = this._popup.querySelector(".form__save-button");
    this._buttonClose = this._popup.querySelector(".popup__close");
    this._ESC = 27;
  }

  setEventListeners(saveHandler) {
    this._buttonClose.addEventListener('click', () => this.close());
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
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscKey.bind(this));
    this._popup.addEventListener('mousedown', this._handleOverlay.bind(this));
  }

  _handleEscKey(evt) {
    if (evt.keyCode === this._ESC) {
      this.close();
    }
  }
  _handleOverlay(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

}

