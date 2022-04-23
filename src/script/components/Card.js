import { api } from "../utils/constants"

export default class Card {
  constructor(item, selector, userId) {
    this._template = document.querySelector(selector).content;
    this._userId = userId;
    this._item = item;
  }
  generate() {

    const newElement = this._template.querySelector(".element").cloneNode(true);
    const photoCardImage = newElement.querySelector(".element__mask-group");
    photoCardImage.src = this._item.link;
    photoCardImage.alt = this._item.name;
    newElement.querySelector(".element__title").textContent = this._item.name;
    const deleteCardButton = newElement.querySelector(".element__delete-button");
    const likeCardButton = newElement.querySelector(".element__like");
    const likeCount = newElement.querySelector(".element__like-count");
    if (this._item.owner._id !== this._userId) {
      deleteCardButton.remove();
    }
    if (this._item.likes.find((like) => like._id === this._userId)) {
      likeCardButton.classList.add("element__like_active");
    }
    likeCount.textContent = this._item.likes.length;
    photoCardImage.addEventListener("click", () => {
      popupImgScale.src = this._item.link;
      popupImgScale.alt = this._item.name;
      popupTittleScale.textContent = this._item.name;
      openPopup(popupImg);
    });

    deleteCardButton.addEventListener("click", (e) => {
      if (this._item.owner._id === userId) {
        api.deleteCard(this._item._id)
          .then(() => {
            e.target.closest(".element").remove();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    likeCardButton.addEventListener("click", (e) => {
      if (this._item.likes.find((like) => like._id === this._userId)) {
        api.deleteLike({ likes: userAllData }, this._item._id)
          .then((dataFromServer) => {
            e.target.classList.toggle("element__like_active");
            likeCount.textContent = dataFromServer.likes.length;
            this._item.likes = dataFromServer.likes
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.putLike({ likes: userAllData }, this._item._id)
          .then((dataFromServer) => {
            e.target.classList.toggle("element__like_active");
            likeCount.textContent = dataFromServer.likes.length;
            this._item.likes = dataFromServer.likes
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    return newElement;
  }
  /*renderCard(element, container) {
    const card = createCard(element);
    container.prepend(card);
  }*/

}