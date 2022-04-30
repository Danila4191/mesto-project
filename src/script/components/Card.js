

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
  _setEventListeners() {

    this._photoCardImage.addEventListener("click", () => {
      this._popupImgScale.setEventListeners()
      this._popupImgScale.open(this._item.link, this._item.name);
    });


    this._deleteCardButton.addEventListener("click", (e) => {
      if (this._item.owner._id === this._userAllData._id) {
        this._deleteCardHandler(e, this._item._id);
      }
    });

    this._likeCardButton.addEventListener("click", (e) => {
      if (this._item.likes.find((like) => like._id === this._userAllData._id)) {
        this._deleteLikeHandler(e, this._likeCount, this._item._id);
      } else {
        this._putLikeHandler(e, this._likeCount, this._item._id);
      }
    });
  }
  generate() {
    this._element = this._template.querySelector(".element").cloneNode(true);
    this._photoCardImage = this._element.querySelector(".element__mask-group");
    this._photoCardImage.src = this._item.link;
    this._photoCardImage.alt = this._item.name;
    this._element.querySelector(".element__title").textContent = this._item.name;
    this._deleteCardButton = this._element.querySelector(
      ".element__delete-button"
    );
    this._likeCardButton = this._element.querySelector(".element__like");
    this._likeCount = this._element.querySelector(".element__like-count");
    if (this._item.owner._id !== this._userAllData._id) {
      this._deleteCardButton.remove();
    }
    if (this._item.likes.find((like) => like._id === this._userAllData._id)) {
      this._likeCardButton.classList.add("element__like_active");
    }
    this._likeCount.textContent = this._item.likes.length;
    this._setEventListeners();
    return this._element;
  }
}
