export function createCard(cardData) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const cardTemplate = `
        <div class="card__image">
            <img src="${cardData.link}" alt="${cardData.name}" class="card__image-item">
        </div>
        <div class="card__info">
            <h2 class="card__title">${cardData.name}</h2>
            <div class="card__like-container">
                <button class="card__like" type="button"></button>
                <span class="card__like-count">${cardData.likes.length}</span>
            </div>
            <button class="card__delete" type="button"></button>
            <button class="popup_type_new-card">Добавить карточку</button>
        </div>
    `;

  cardElement.innerHTML = cardTemplate;

  // Добавляем обработчики событий
  cardElement
    .querySelector(".card__image-item")
    .addEventListener("click", () => handleImageClick(cardElement));

  cardElement
    .querySelector(".card__like")
    .addEventListener("click", () => handleLike(cardElement));

  cardElement
    .querySelector(".card__delete")
    .addEventListener("click", () => handleDelete(cardElement));

  cardElement
    .querySelector(".card__edit")
    .addEventListener("click", () => handleEditCard(cardElement, cardData));

  cardElement
    .querySelector(".popup_type_new-card")
    .addEventListener("click", handleAddCard);

  return cardElement;
}
