export function openModal(modalElement) {
  modalElement.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closeModal(modalElement) {
  modalElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

export function showImagePopup(imageUrl) {
  const popupImage = document.querySelector(".popup_image");
  const popupImageImg = popupImage.querySelector(".popup__image");
  popupImageImg.src = imageUrl;
  openModal(popupImage);
}
