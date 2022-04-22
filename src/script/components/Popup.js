import {
  ESC,
  api,
  popupEdit,
  popupAdd,
  formText,
  formName,
  infoName,
  addImgButtonSave,
  infoParagraph,
  photos,
  popupImgProfile,
  formAvatarProfileLink,
  profileAvatar,
  avatarProfileSave,
  editProfileButtonSave,} from "../utils/constants"
class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._buttomSave = this._popup.querySelector(".form__save-button");
  }
  submit(evt){
    evt.preventDefault();
    this._buttomSave.textContent = "Сохранить...";
  }

/* TODO В card
  submitAddCardForm(evt) {
    evt.preventDefault();
    addImgButtonSave.textContent = "Создать...";
    api.submitAddCardForm({
      name: formEmptyName.value,
      link: formEmptyLink.value,
    })
      .then((dataFromServer) => {
        //renderCard(dataFromServer, photos);   TODO обновить после написания класса card
        this.close();
        formEmptyName.value = "";
        formEmptyLink.value = "";
        addImgButtonSave.disabled = "disabled";
        addImgButtonSave.classList.add("form__save-button_disabled");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addImgButtonSave.textContent = "Создать";
      });
  }*/

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
