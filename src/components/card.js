const cardTemplate = document.querySelector("#card-template")?.content;

if (!cardTemplate) {
  throw new Error("Card template not found in the DOM");
}

/**
 * Создает DOM-элемент карточки
 * @param {Object} cardData - Данные карточки
 * @param {Function} deleteCallback - Функция удаления карточки
 * @param {Function} likeCallback - Функция обработки лайка
 * @param {Function} imageCallback - Функция открытия изображения
 * @param {string} userId - ID текущего пользователя
 * @returns {HTMLElement} DOM-элемент карточки
 */
function createCard(
  cardData,
  deleteCallback,
  likeCallback,
  imageCallback,
  userId
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesAmount = cardElement.querySelector(".card__likes-amount");

  if (
    !cardImage ||
    !cardTitle ||
    !deleteButton ||
    !likeButton ||
    !likesAmount
  ) {
    throw new Error("Required card elements not found in template");
  }

  // Заполнение данных карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name || "Изображение места";
  cardTitle.textContent = cardData.name || "";

  // Обработка кнопки удаления
  if (userId && cardData.owner?._id === userId) {
    deleteButton.addEventListener("click", (event) => {
      deleteCallback(event, cardData._id);
    });
  } else {
    deleteButton.remove();
  }

  // Обработка лайков
  const likesCount = cardData.likes?.length || 0;
  likesAmount.textContent = likesCount;

  const isLiked = cardData.likes?.some((like) => like._id === userId) || false;
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", (event) => {
    likeCallback(event, cardData._id);
  });

  // Обработка клика по изображению
  if (cardData.link) {
    cardImage.addEventListener("click", () => imageCallback(cardData));
  }

  return cardElement;
}

/**
 * Удаляет карточку из DOM
 * @param {Event} event - Событие клика
 */
function deleteCard(event) {
  if (!event?.target) return;

  const card = event.target.closest(".card");
  card?.remove();
}

/**
 * Переключает состояние лайка
 * @param {Event} event - Событие клика
 * @param {HTMLElement} likesCounter - Элемент счетчика лайков
 * @param {number} newLikesCount - Новое количество лайков
 */
function toggleLike(event, likesCounter, newLikesCount) {
  if (!event?.target) return;

  event.target.classList.toggle("card__like-button_is-active");

  if (likesCounter && typeof newLikesCount === "number") {
    likesCounter.textContent = newLikesCount;
  }
}

/**
 * Обрабатывает клик по изображению карточки
 * @param {Object} cardData - Данные карточки
 * @param {HTMLElement} popupElement - Элемент попапа с изображением
 */
function handleImageClick(cardData, popupElement) {
  if (!popupElement) {
    console.error("Popup element not provided");
    return;
  }

  const popupImage = popupElement.querySelector(".popup__image");
  const popupCaption = popupElement.querySelector(".popup__caption");

  if (!popupImage || !popupCaption) {
    console.error("Popup elements not found");
    return;
  }

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name || "Изображение места";
  popupCaption.textContent = cardData.name || "";

  // Добавьте этот вывод для отладки
  console.log("Popup content set:", {
    src: popupImage.src,
    alt: popupImage.alt,
    caption: popupCaption.textContent,
  });
}

export { createCard, deleteCard, toggleLike, handleImageClick };
