export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }
  _checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
  };

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    }).then(this._checkResponse);
  }


  deleteCard(dataId) {
    return fetch(`${this._url}/cards/${dataId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  submitAvatarProfileForm(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }
  submitProfileForm(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }
  submitAddCardForm(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }
  putLike(dataId) {
    return fetch(`${this._url}/cards/likes/${dataId}`, {
      method: "PUT",
      headers: this._headers
    }).then(this._checkResponse);
  }
  deleteLike(dataId) {
    return fetch(`${this._url}/cards/likes/${dataId}`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._checkResponse);
  }
}





