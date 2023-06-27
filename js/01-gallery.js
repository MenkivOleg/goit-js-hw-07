import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryBox = document.querySelector(".gallery");
let modalInstance = null;

function createGalleryItemMarkup({ preview, original, description }) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `;
}

function renderGalleryItems() {
  const galleryMarkup = galleryItems
    .map((item) => createGalleryItemMarkup(item))
    .join("");

  galleryBox.innerHTML = galleryMarkup;
}

function openModal(event) {
    event.preventDefault();
  if (!event.target.matches('.gallery__image')) {
    return;
  }
  const imageSource = event.target.dataset.source;
  
  const modalContent = `<img src="${imageSource}" alt=""/>`;
  modalInstance = basicLightbox.create(modalContent, {
    onShow: () => {
      document.addEventListener("keydown", closeModalOnEscape);
    },
    onClose: () => {
      document.removeEventListener("keydown", closeModalOnEscape);
    },
  });
  modalInstance.show();
}

function closeModalOnEscape(event) {
  if (event.code === "Escape") {
    modalInstance.close();
  }
}

galleryBox.addEventListener("click", openModal);

renderGalleryItems();