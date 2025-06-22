const cardTemplate = document.querySelector("#card-template").content;

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

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", deleteCallback);
  likeButton.addEventListener("click", likeCallback);
  cardImage.addEventListener("click", () => imageCallback(cardData));

  return cardElement;
}

function deleteCard(event) {
  const card = event.target.closest(".card");
  card?.remove();
}

function toggleLike(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

function handleImageClick(cardData, popupElement) {
  const popupImage = popupElement.querySelector(".popup__image");
  const popupCaption = popupElement.querySelector(".popup__caption");

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
}

export { createCard, deleteCard, toggleLike, handleImageClick };
