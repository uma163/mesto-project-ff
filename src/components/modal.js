// Функция открытия попапа
export function openModal(modalElement) {
  modalElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscapeKey);
}

// Функция закрытия попапа
export function closeModal(modalElement) {
  modalElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscapeKey);
}

// Обработчик закрытия по Escape
function handleEscapeKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) closeModal(openedPopup);
  }
}

// Функция настройки обработчиков для попапа (добавьте эту новую функцию)
export function setupModalListeners(popupElement) {
  const closeButton = popupElement.querySelector('.popup__close');
  
  if (closeButton) {
    closeButton.addEventListener('click', () => closeModal(popupElement));
  }
  
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target === popupElement) {
      closeModal(popupElement);
    }
  });
}

// Функция для показа изображения (если у вас есть showImagePopup)
export function showImagePopup(imageUrl, caption) {
  // Реализация функции, если она вам нужна
}