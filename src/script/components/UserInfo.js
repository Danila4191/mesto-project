

export default class UserInfo {
  constructor(nameSelector, aboutSelector, аvatarSelector, infoButtonSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(аvatarSelector);
    this._infoButton = document.querySelector(infoButtonSelector);

  }
  setEventListeners(avatarFormHandler, editFormHandler) {
    this._avatar.addEventListener("click", avatarFormHandler);
    this._infoButton.addEventListener("click", editFormHandler)
  }
  getUserInfo() {
    return { name: this._name.textContent, about: this._about.textContent };
  }
  getUserAvatar() {
    return { avatar: this._avatar.src };
  }
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._id = data._id;
  }
  getUserId() {
    return this._id;
  }
  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
