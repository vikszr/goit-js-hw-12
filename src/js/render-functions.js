export default function createGalleryCard(image) {
  return `
    <div class= "gallery-item">
    <a class="gallery-link" href="${image.largeImageURL}">  
    <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" loading="lazy"/>
    <div class="image-info">
    <p class="info"> <b>Likes</b> ${image.likes}</p>
    <p class="info"> <b>Views</b> ${image.views}</p>
    <p class="info"> <b>Comments</b> ${image.comments}</p>
    <p class="info"> <b>Downloads</b> ${image.downloads}</p>
    </div>
    </a>
    </div>
    `;
}
