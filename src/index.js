import logo from "./images/logo.svg";
import { initialCards } from "./components/constants.js";
import { createCard, toggleLike, deleteCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  setupModalListeners,
} from "./components/modal.js";
import "./styles/index.css";

// DOM элементы
const elements = {
  // Шаблоны и контейнеры
  cardTemplate: document.querySelector("#card-template"),
  placesList: document.querySelector(".places__list"),

  // Попапы
  imagePopup: document.querySelector(".popup_type_image"),
  editPopup: document.querySelector(".popup_type_edit"),
  newCardPopup: document.querySelector(".popup_type_new-card"),

  // Элементы попапа изображения
  popupImage: document.querySelector(".popup__image"),
  popupCaption: document.querySelector(".popup__caption"),

  // Кнопки
  editButton: document.querySelector(".profile__edit-button"),
  addButton: document.querySelector(".profile__add-button"),

  // Профиль
  profileTitle: document.querySelector(".profile__title"),
  profileDescription: document.querySelector(".profile__description"),

  // Формы
  editForm: document.querySelector(".popup_type_edit .popup__form"),
  newCardForm: document.querySelector(".popup_type_new-card .popup__form"),
};

// ID текущего пользователя (пример, нужно заменить на реальный)
const currentUserId = "user-123";

// Обработчик клика по изображению карточки
function handleImageClick(cardData) {
  elements.popupImage.src = cardData.link;
  elements.popupImage.alt = cardData.name;
  elements.popupCaption.textContent = cardData.name;
  openModal(elements.imagePopup);
}

// Создание и рендер карточки
function renderCard(cardData) {
  const cardHandlers = {
    handleCardClick: handleImageClick,
    handleLikeClick: toggleLike,
    handleDeleteClick: deleteCard,
  };

  const cardElement = createCard(cardData, cardHandlers, currentUserId);
  elements.placesList.append(cardElement);
}

// Инициализация форм
function setupForms() {
  // Форма редактирования профиля
  elements.editButton.addEventListener("click", () => {
    const nameInput = elements.editForm.querySelector(
      ".popup__input_type_name"
    );
    const jobInput = elements.editForm.querySelector(
      ".popup__input_type_description"
    );
    nameInput.value = elements.profileTitle.textContent;
    jobInput.value = elements.profileDescription.textContent;
    openModal(elements.editPopup);
  });

  elements.editForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const nameInput = elements.editForm.querySelector(
      ".popup__input_type_name"
    );
    const jobInput = elements.editForm.querySelector(
      ".popup__input_type_description"
    );
    elements.profileTitle.textContent = nameInput.value;
    elements.profileDescription.textContent = jobInput.value;
    closeModal(elements.editPopup);
  });

  // Форма добавления карточки
  elements.addButton.addEventListener("click", () => {
    elements.newCardForm.reset();
    openModal(elements.newCardPopup);
  });

  elements.newCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const nameInput = elements.newCardForm.querySelector(
      ".popup__input_type_card-name"
    );
    const linkInput = elements.newCardForm.querySelector(
      ".popup__input_type_url"
    );

    const newCard = {
      name: nameInput.value,
      link: linkInput.value,
      owner: { _id: currentUserId },
      likes: [],
    };

    renderCard(newCard);
    closeModal(elements.newCardPopup);
  });
}

// Инициализация модальных окон
function setupModals() {
  setupModalListeners(elements.imagePopup);
  setupModalListeners(elements.editPopup);
  setupModalListeners(elements.newCardPopup);
}

// Инициализация приложения
function initApp() {
  // Рендер начальных карточек
  initialCards.forEach(renderCard);

  // Настройка форм
  setupForms();

  // Настройка модальных окон
  setupModals();
}

// Запуск приложения после загрузки DOM
document.addEventListener("DOMContentLoaded", initApp);
