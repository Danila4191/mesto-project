

export default class UserInfo {
  constructor(nameSelector, aboutSelector, аvatarSelector, аvatarButton, infoButtonSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(аvatarSelector);
    this._avatarButton = document.querySelector(аvatarButton);
    this._infoButton = document.querySelector(infoButtonSelector);

  }
  setEventListeners(avatarFormHandler, editFormHandler) {
    this._avatarButton.addEventListener("click", avatarFormHandler);
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
    this._userAllData = data;
  }
  getUserId() {
    return this._userAllData._id;
  }
  getUserData() {
    return this._userAllData;
  }
  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
