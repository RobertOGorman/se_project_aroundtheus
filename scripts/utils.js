export function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keyup", handleEscPress);
  document.addEventListener("click", closePopupOnRemoteClick);
}

export function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keyup", handleEscPress);
  document.removeEventListener("click", closePopupOnRemoteClick);
}

function handleEscPress(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_open");
    closePopup(openedPopup);
  }
}

function closePopupOnRemoteClick(event) {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
}
