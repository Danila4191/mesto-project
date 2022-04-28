import "../src/pages/index.css";

import { api } from './script/utils/constants'
import PopupWithForm from './script/components/PopupWithForm';
import UserInfo from './script/components/UserInfo';
import Section from './script/components/Section';
import Card from './script/components/Card';
import FormValidator from './script/components/FormValidator';
import PopupWithImage from "./script/components/PopupWithImage";

const userInfo = new UserInfo('.info__name', '.info__paragraph', '.profile__avatar', '.profile__avatar-button', '.info__edit-button');

const validationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  formSelector: ".form",
  inputErrorClass: "form__input_error",
  inactiveButtonClass: "form__save-button_disabled",
};



const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};


enableValidation(validationConfig);

const popupEditProfile = new PopupWithForm('#popup-edit', formValidators['edit-profile']);
popupEditProfile.setEventListeners((evt) => {
  evt.preventDefault();
  popupEditProfile.addDotesButtonName();
  const values = popupEditProfile.getValues();
  api.submitProfileForm({ name: values.get('form_name').value, about: values.get('form_text').value })
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


const popupAvatar = new PopupWithForm('#popupImgProfile', formValidators['add-img']);
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



const popupImgScale = new PopupWithImage("#popup-img");

const renderer = (item, userData) => {
  const card = new Card(item, '#template', userData, popupImgScale,
    ((e, id) => {
      api
        .deleteCard(id)
        .then(() => {
          e.target.closest(".element").remove();
        })
        .catch((err) => {
          console.log(err);
        });
    }).bind(card),
    ((e, likeCount, id) => {
      api
        .deleteLike(id)
        .then((dataFromServer) => {
          e.target.classList.toggle("element__like_active");
          likeCount.textContent = dataFromServer.likes.length;
          item.likes = dataFromServer.likes;
        })
        .catch((err) => {
          console.log(err);
        }
        )
    }).bind(card),
    ((e, likeCount, id) => {
      api
        .putLike(id)
        .then((dataFromServer) => {
          e.target.classList.toggle("element__like_active");
          likeCount.textContent = dataFromServer.likes.length;
          item.likes = dataFromServer.likes;
        })
        .catch((err) => {
          console.log(err);
        }
        )
    }).bind(card)
  );
  return card.generate();

}
let cardList = null;
Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(([userData, elements]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    cardList = new Section({
      renderer: (item) => renderer(item, userData)
    }, '.photos');
    cardList.renderItems(elements);
  })
  .catch(err => {
    console.log(err);
  });


const popupAddCard = new PopupWithForm('#popup-add', formValidators['add-imgProfile']);
popupAddCard.setEventListeners((evt) => {
  evt.preventDefault();
  popupAddCard.addDotesButtonName();
  const values = popupAddCard.getValues();
  api.submitAddCardForm({ name: values.get('formEmptyName').value, link: values.get('formEmptyLink').value })
    .then((dataFromServer) => {

      cardList.addItem(dataFromServer, false);
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
