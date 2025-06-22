import "./styles/index.css";
import logo from "./images/logo.svg";
import initialCards from "./cards.js";
import { deleteCard, toggleLike, handleImageClick } from "./components/card.js";

// DOM элементы
const elements = {
  cardTemplate: document.querySelector("#card-template"),
  placesList: document.querySelector(".places__list"),
  imagePopup: document.querySelector(".popup_type_image"),
  popupImage: document.querySelector(".popup__image"),
  popupCaption: document.querySelector(".popup__caption"),
  editButton: document.querySelector(".profile__edit-button"),
  editPopup: document.querySelector(".popup_type_edit"),
  profileTitle: document.querySelector(".profile__title"),
  profileDescription: document.querySelector(".profile__description"),
  newCardForm: document.querySelector(".popup_type_new-card .popup__form"),
  addButton: document.querySelector(".profile__add-button"),
  logoElement: document.querySelector(".logo"),
};

// Проверка наличия основных элементов
if (!elements.cardTemplate || !elements.placesList) {
  throw new Error("Required elements are missing in the DOM");
}

// Функция для создания карточки
function createCardElement(cardData) {
  const cardElement = elements.cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Обработчики событий
  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", toggleLike);
  cardImage.addEventListener("click", () => {
    handleImageClick(cardData, elements.imagePopup);
    modal.open(elements.imagePopup);
  });

  return cardElement;
}

// Функция для рендеринга карточки
function renderCard(cardData) {
  elements.placesList.append(createCardElement(cardData));
}

// Управление модальными окнами
const modal = {
  handleEscKeyUp(e) {
    if (e.key === "Escape") {
      const popup = document.querySelector(".popup_is-opened");
      if (popup) this.close(popup);
    }
  },

  open(modalElement) {
    modalElement.style.display = "flex";
    requestAnimationFrame(() => {
      modalElement.classList.add("popup_is-opened");
    });
    this.setupListeners(modalElement);
    document.addEventListener("keydown", this.handleEscKeyUp.bind(this));
  },

  close(modalElement) {
    modalElement.classList.remove("popup_is-opened");
    const handler = () => {
      modalElement.style.display = "none";
      modalElement.removeEventListener("transitionend", handler);
    };
    modalElement.addEventListener("transitionend", handler, { once: true });
    document.removeEventListener("keydown", this.handleEscKeyUp.bind(this));
  },

  setupListeners(popup) {
    const closeButton = popup.querySelector(".popup__close");
    if (!closeButton) {
      console.warn("Close button not found!");
      return;
    }

    closeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.close(popup);
    });

    popup.addEventListener("click", (e) => {
      if (e.target === popup) this.close(popup);
    });
  },
};

// Обработчики форм
function setupFormHandlers() {
  // Редактирование профиля
  if (elements.editButton && elements.editPopup) {
    const form = elements.editPopup.querySelector(".popup__form");
    const nameInput = form.querySelector("input[name='name']");
    const jobInput = form.querySelector("input[name='description']");

    elements.editButton.addEventListener("click", () => {
      nameInput.value = elements.profileTitle.textContent;
      jobInput.value = elements.profileDescription.textContent;
      modal.open(elements.editPopup);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      elements.profileTitle.textContent = nameInput.value;
      elements.profileDescription.textContent = jobInput.value;
      modal.close(elements.editPopup);
    });
  }

  // Добавление новой карточки
  if (elements.newCardForm) {
    const nameInput = elements.newCardForm.querySelector(
      "input[name='place-name']"
    );
    const linkInput = elements.newCardForm.querySelector("input[name='link']");

    elements.newCardForm.addEventListener("submit", (e) => {
      e.preventDefault();
      renderCard({
        name: nameInput.value,
        link: linkInput.value,
      });
      modal.close(elements.newCardForm.closest(".popup"));
      elements.newCardForm.reset();
    });
  }

  // Обработчик кнопки "+"
  if (elements.addButton) {
    elements.addButton.addEventListener("click", () => {
      const newCardPopup = document.querySelector(".popup_type_new-card");
      if (newCardPopup) {
        modal.open(newCardPopup);
      } else {
        console.error("Popup for new card not found");
      }
    });
  }
}

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  // Рендер начальных карточек
  initialCards.forEach(renderCard);

  // Настройка обработчиков форм
  setupFormHandlers();

  // Инициализация модальных окон
  [
    elements.imagePopup,
    elements.editPopup,
    document.querySelector(".popup_type_new-card"),
  ]
    .filter((popup) => popup)
    .forEach((popup) => modal.setupListeners(popup));

  // Установка логотипа
  if (elements.logoElement) {
    elements.logoElement.src = logo;
  }
});
