const config = {
  url: "https://nomoreparties.co/v1/plus-cohort-8/cards/",
  urlUser: "https://nomoreparties.co/v1/plus-cohort-8/users/me",
  urlUserAvatar: "https://nomoreparties.co/v1/plus-cohort-8/users/me/avatar",
  urlLikes: "https://nomoreparties.co/v1/plus-cohort-8/cards/likes/",
  headers: {
    "content-type": "application/json",
    Authorization: "8263c3c6-b8b7-4055-9b88-53b541ccbb29",
  },
};
const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};
export function userApi(data) {
  return fetch(config.urlUser, {
    method: "GET",
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then(onResponce)
    .catch((err) => console.log(err));
}
export function getAllCardsApi() {
  return fetch(config.url, {
    method: "GET",
    headers: config.headers,
  })
    .then(onResponce)
    .catch((err) => console.log(err));
}
export function deleteCardApi(dataId) {
  return fetch(`${config.url}/${dataId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(onResponce)
    .catch((err) => console.log(err));
}
export function submitAvatarProfileFormApi(data) {
  return fetch(config.urlUserAvatar, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then(onResponce)
    .catch((err) => console.log(err));
}
export function submitProfileFormApi(data) {
  return fetch(config.urlUser, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then(onResponce)
    .catch((err) => console.log(err));
}
export function submitAddCardFormApi(data) {
  return fetch(config.url, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then(onResponce)
    .catch((err) => console.log(err));
}
export function putLikeApi(data, dataId) {
  return fetch(`${config.urlLikes}/${dataId}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then(onResponce)
    .catch((err) => console.log(err));
}
export function deleteLikeApi(data, dataId) {
  return fetch(`${config.urlLikes}/${dataId}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then(onResponce)
    .catch((err) => console.log(err));
}
