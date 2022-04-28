import Popup from "./Popup"

export default class PopupWithImage extends Popup {
  constructor(popupSelector, link, name) {
    super(popupSelector, null, link, name);
    this.init(link, name);
    this._popupImgScale = document.querySelector(".popup__img");
    this._popupTittleScale = document.querySelector(".popup__img-title");
  }
  init(link, name){
    this._link = link
    this._name = name
  }
  setImgPopup() {

    this._popupImgScale.src = this._link;
    this._popupImgScale.alt = this._name;
    this._popupTittleScale.textContent = this._name;
  }
}

