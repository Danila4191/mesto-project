import { ESC } from '../utils/constants'
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonSave = this._popup.querySelector(".form__save-button");
    this._buttonClose = this._popup.querySelector(".popup__close");
  }

  setEventListeners(saveHandler) {
    this._buttonClose.addEventListener('click', () => this.close());
    this._buttonSave.addEventListener('click', saveHandler);

  }
  addDotesButtonName() {
    this._buttonSave.textContent = btn.textContent + '...';
  } 
  removeDotesFromButtonName() {
    this._buttonSave.textContent = btn.textContent.replace('...', '');
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscKey);
    this._popup.removeEventListener("mousedown", this._handleOverlay);
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscKey);
    this._popup.addEventListener('mousedown', this._handleOverlay);
  }

  _handleEscKey(evt) {
    if (evt.keyCode === ESC) {
      // const openedPopup = document.querySelector(".popup_opened");
      this.close();
    }
  }
  _handleOverlay(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close(evt.target);
    }
  }

}
