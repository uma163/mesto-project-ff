import "./styles/index.css";
import initialCards from "./cards.js";
import logo from "./images/logo.svg";
import avatar from "./images/avatar.jpg";

// Исправлено: импортируем только нужные функции из card.js
import { createCard } from "./components/card.js";

const cardTemplate = document.querySelector("#card-template");
const placesList = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// Функция для удаления карточки
function deleteCard(event) {
  const card = event.target.closest(".card");
  if (card) {
    card.remove();
  }
}

// Функция для обработки лайка
function toggleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("card__like-button_is-active");
}

// Функция для обработки клика по изображению
function handleImageClick(cardData) {
  imagePopupImage.src = cardData.link;
  imagePopupImage.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

// Функция для создания карточки
function createCardElement(cardData) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Добавляем обработчики событий
  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", toggleLike);
  cardImage.addEventListener("click", () => handleImageClick(cardData));

  return cardElement;
}

// Функция для рендеринга карточки
function renderCard(cardData) {
  const cardElement = createCardElement(cardData);
  placesList.appendChild(cardElement);
}

// Рендерим начальные карточки
initialCards.forEach(renderCard);

// Обработчик нажатия клавиши Escape
const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    if (popup) {
      closeModal(popup);
    }
  }
};

export const openModal = (modal) => {
  modal.style.display = "flex";
  requestAnimationFrame(() => {
    modal.classList.add("popup_is-opened");
  });
  setupPopupListeners(modal);

  document.addEventListener("keydown", handleEscKeyUp);
};

export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  modal.addEventListener(
    "transitionend",
    () => {
      modal.style.display = "none";
    },
    { once: true }
  );
  document.removeEventListener("keydown", handleEscKeyUp);
};

export const setupPopupListeners = (popup) => {
  const closeButton = popup.querySelector(".popup__close");
  if (!closeButton) {
    console.warn("Кнопка закрытия не найдена!");
    return;
  }

  closeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    closeModal(popup);
  });

  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const editButton = document.querySelector(".profile__edit-button");
  const editPopup = document.querySelector(".popup_type_edit");
  const formElement = editPopup.querySelector(".popup__form");
  const nameInput = formElement.querySelector("input[name='name']");
  const jobInput = formElement.querySelector("input[name='description']");

  // Добавляем слушатели для попапа редактирования профиля
  editButton.addEventListener("click", () => {
    // Проверяем наличие всех элементов
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");
    const nameInput = document.querySelector("input[name='name']");
    const jobInput = document.querySelector("input[name='description']");
    const editPopup = document.querySelector(".popup_type_edit");

    // Заполняем поля значениями
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    // Открываем попап
    openModal(editPopup);
  });

  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newAbout = jobInput.value;

    document.querySelector(".profile__title").textContent = newName;
    document.querySelector(".profile__description").textContent = newAbout;

    closeModal(editPopup);
  });

  // Слушатель для добавления новых карточек
  const newCardForm = document.querySelector(
    ".popup_type_new-card .popup__form"
  );
  const newCardNameInput = newCardForm.querySelector(
    "input[name='place-name']"
  );
  const newCardLinkInput = newCardForm.querySelector("input[name='link']");

  newCardForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const newCardData = {
      name: newCardNameInput.value,
      link: newCardLinkInput.value,
    };

    renderCard(newCardData);
    closeModal(document.querySelector(".popup_type_new-card"));
    newCardForm.reset();
  });
});
