const cardTemplate = document.querySelector("#card-template");

const placesList = document.querySelector(".places__list");

function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

function createCard(cardData) {
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);

  placesList.appendChild(cardElement);
}

initialCards.forEach(renderCard);
