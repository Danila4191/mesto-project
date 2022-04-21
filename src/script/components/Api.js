const config = {
  url: "https://nomoreparties.co/v1/plus-cohort-8",
  headers: {
    "content-type": "application/json",
    Authorization: "8263c3c6-b8b7-4055-9b88-53b541ccbb29",
  },
};
const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};
export function getUserInfoApi(data) {
  return fetch(`${config.url}/users/me`, {
    method: "GET",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}
export function getAllCardsApi() {
  return fetch(`${config.url}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(checkResponse);
}
export function deleteCardApi(dataId) {
  return fetch(`${config.url}/cards/${dataId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}
export function submitAvatarProfileFormApi(data) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}
export function submitProfileFormApi(data) {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}
export function submitAddCardFormApi(data) {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}
export function putLikeApi(data, dataId) {
  return fetch(`${config.url}/cards/likes/${dataId}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}
export function deleteLikeApi(data, dataId) {
  return fetch(`${config.url}/cards/likes/${dataId}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}
