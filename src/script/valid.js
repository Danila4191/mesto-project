const toggleButtonState = (button, isActive = false, config) => {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = "disabled";
  }
};
const showError = (errorElement, inputElement, config) => {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};
const hideError = (errorElement, inputElement, config) => {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};
const checkInputValidity = (inputElement, formElement, config) => {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!isInputValid) {
    showError(errorElement, inputElement, config);
  } else {
    hideError(errorElement, inputElement, config);
  }
};
const setEventLisetner = (formElement, config) => {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitbuttonSelector);

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  [...inputList].forEach((input) => {
    input.addEventListener("input", (e) => {
      checkInputValidity(input, formElement, config);
      toggleButtonState(submitButton, formElement.checkValidity(), config);
    });
  });
};

export const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  [...forms].forEach((form) => {
    setEventLisetner(form, config);
  });
};
