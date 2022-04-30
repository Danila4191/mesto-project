

export default class Card {
  constructor(item, selector, userAllData, popupImgScale, deleteCardHandler, deleteLikeHandler, putLikeHandler) {
    this._template = document.querySelector(selector).content;
    this._item = item;
    this._userAllData = userAllData;
    this._popupImgScale = popupImgScale;
    this._deleteCardHandler = deleteCardHandler;
    this._deleteLikeHandler = deleteLikeHandler;
    this._putLikeHandler = putLikeHandler;

  }
  _setEventListeners(photoCardImage, deleteCardButton, likeCardButton) {
    photoCardImage.addEventListener("click", () => {
      this._popupImgScale.setEventListeners()
      this._popupImgScale.open(this._item.link,this._item.name);

    });


    deleteCardButton.addEventListener("click", (e) => {
      if (this._item.owner._id === this._userAllData._id) {
        this._deleteCardHandler(e, this);
      }
    });

    likeCardButton.addEventListener("click", (e) => {
      if (this._item.likes.find((like) => like._id === this._userAllData._id)) {
        this._deleteLikeHandler(e, this);
      } else {
        this._putLikeHandler(e, this);
      }
    });
  }
  generate() {
    this._element = this._template.querySelector(".element").cloneNode(true);
    const photoCardImage = this._element.querySelector(".element__mask-group");
    photoCardImage.src = this._item.link;
    photoCardImage.alt = this._item.name;
    this._element.querySelector(".element__title").textContent = this._item.name;
    const deleteCardButton = this._element.querySelector(
      ".element__delete-button"
    );
    const likeCardButton = this._element.querySelector(".element__like");
    const likeCount = this._element.querySelector(".element__like-count");
    if (this._item.owner._id !== this._userAllData._id) {
      deleteCardButton.remove();
    }
    if (this._item.likes.find((like) => like._id === this._userAllData._id)) {
      likeCardButton.classList.add("element__like_active");
    }
    likeCount.textContent = this._item.likes.length;
    this._setEventListeners(photoCardImage, deleteCardButton, likeCardButton);
    return this._element;
  }
}
