import { cardClasses } from "./constants.js";

// Функция создания DOM-элемента карточки
export function createCard(cardData, handlers, userId) {
  const { handleCardClick, handleLikeClick, handleDeleteClick } = handlers;

  // Клонируем шаблон карточки
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(cardClasses.cardSelector)
    .cloneNode(true);

  // Находим элементы карточки
  const cardImage = cardElement.querySelector(cardClasses.imageSelector);
  const cardTitle = cardElement.querySelector(cardClasses.titleSelector);
  const deleteButton = cardElement.querySelector(
    cardClasses.deleteButtonSelector
  );
  const likeButton = cardElement.querySelector(cardClasses.likeButtonSelector);

  // Заполняем данные карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt || cardData.name;
  cardTitle.textContent = cardData.name;

  // Показываем кнопку удаления только для своих карточек
  if (cardData.owner && cardData.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", handleDeleteClick);
  }

  // Проверяем, есть ли мой лайк на карточке
  if (cardData.likes && cardData.likes.some((like) => like._id === userId)) {
    likeButton.classList.add(cardClasses.activeLikeClass);
  }

  // Добавляем обработчики событий
  likeButton.addEventListener("click", handleLikeClick);
  cardImage.addEventListener("click", () => handleCardClick(cardData));

  return cardElement;
}

// Функция переключения состояния лайка
export function toggleLike(evt) {
  evt.target.classList.toggle(cardClasses.activeLikeClass);
}

// Функция удаления карточки
export function deleteCard(evt) {
  const card = evt.target.closest(cardClasses.cardSelector);
  card.remove();
}

// Функция обновления счетчика лайков
export function updateLikesCounter(cardElement, likesCount) {
  const likesCounter = cardElement.querySelector(".card__likes-counter");
  if (likesCounter) {
    likesCounter.textContent = likesCount || "";
  }
}
