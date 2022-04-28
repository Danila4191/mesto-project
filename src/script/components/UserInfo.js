
export default class UserInfo {
  constructor(nameSelector, aboutSelector, аvatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(аvatarSelector);
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
    this._avatar.src = data.avatar;
  }
}
