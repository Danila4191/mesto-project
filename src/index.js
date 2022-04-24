import "../src/pages/index.css";

import { api } from './script/utils/constants'
import PopupWithForm from './script/components/PopupWithForm';
import UserInfo from './script/components/UserInfo';
import Section from './script/components/Section';
import Card from './script/components/Card';
import FormValidator from './script/components/FormValidator';

const userInfo = new UserInfo('.info__name', '.info__paragraph', '.profile__avatar', '.profile__avatar-button', '.info__edit-button');
const popupEditProfile = new PopupWithForm('#popup-edit');
popupEditProfile.setEventListeners((evt) => {
  evt.preventDefault();
  popupEditProfile.addDotesButtonName();
  const values = popupEditProfile.getValues();
  api.submitProfileForm({ name: values.get('form_name').textContent, about: values.get('form_text').textContent })
    .then((data) => {
      userInfo.setUserInfo({ name: data.name, about: data.about });
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.removeDotesFromButtonName();
    });
});


const popupAvatar = new PopupWithForm('#popupImgProfile');
popupAvatar.setEventListeners((evt) => {
  evt.preventDefault();
  popupAvatar.addDotesButtonName();
  const values = popupAvatar.getValues();

  api.submitAvatarProfileForm({ avatar: values.get('formAvatarProfileLink').value })
    .then((data) => {
      userInfo.setUserAvatar({ avatar: data.avatar });
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.removeDotesFromButtonName();
    });
});

userInfo.setEventListeners(
  () => popupAvatar.open(),
  () => {
    const sourceUserInfo = userInfo.getUserInfo();
    const targetImputes = popupEditProfile.getValues();
    targetImputes.get('form_name').value = sourceUserInfo.name;
    targetImputes.get('form_text').value = sourceUserInfo.about;
    popupEditProfile.open();
  }
);






Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(([userData, elements]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);

    const cardList = new Section({
      data: elements,
      renderer: (item) => {
        const card = new Card(item, '#template', userData);
        const cardElement = card.generate();
        cardList.setItem(cardElement);
      }
    }, '.photos');
    cardList.renderItems();
  })
  .catch(err => {
    console.log(err);
  });



const popupAddCard = new PopupWithForm('#popup-add');
popupAddCard.setEventListeners((evt) => {
  evt.preventDefault();
  popupAddCard.addDotesButtonName();
  const values = popupAddCard.getValues();
  api.submitAddCardForm({ name: values.get('formEmptyName').value, link: values.get('formEmptyLink').value })
    .then((dataFromServer) => {

      const section = new Section({
        data: dataFromServer,
        renderer: (item) => {
          const card = new Card(item, '#template', userInfo.getUserData());
          const cardElement = card.generate();
          section.setItem(cardElement);
        }
      }, '.photos');
      section.renderItem();

      popupAddCard.close();
      popupAddCard.clearValues();
      popupAddCard.disableButtonSave();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.removeDotesFromButtonName();
    });
});
const addCardButton = document.querySelector(".profile__button");
addCardButton.addEventListener("click", () => {
  popupAddCard.open();
});


const validationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  formSelector: ".form",
  inputErrorClass: "form__input_error",
  inactiveButtonClass: "form__save-button_disabled",
};
const validator = new FormValidator(validationConfig);
validator.enableValidation();
