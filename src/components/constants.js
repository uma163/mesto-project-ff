// Конфигурация валидации форм
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Начальные карточки для отображения
export const initialCards = [
  {
    name: "Франция",
    link: "https://plus.unsplash.com/premium_photo-1683120756391-5eded4fd1718?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Греция",
    link: "https://images.unsplash.com/photo-1629470035939-ca3935e2292d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Марокко",
    link: "https://images.unsplash.com/photo-1559925523-10de9e23cf90?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Бали",
    link: "https://images.unsplash.com/photo-1592065289359-7f20aec44239?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Япония",
    link: "https://images.unsplash.com/photo-1622285422722-b1b3eb36c728?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Классы для карточек
export const cardClasses = {
  cardSelector: ".card",
  imageSelector: ".card__image",
  titleSelector: ".card__title",
  deleteButtonSelector: ".card__delete-button",
  likeButtonSelector: ".card__like-button",
  activeLikeClass: "card__like-button_is-active",
};

// Селекторы для профиля
export const profileSelectors = {
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
};

// Настройки API (если используется)
export const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-24",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
};

// Сообщения об ошибках
export const errorMessages = {
  emptyInput: "Это обязательное поле",
  wrongUrl: "Введите URL-адрес",
  wrongLength: "Должно быть от 2 до 30 символов",
};
