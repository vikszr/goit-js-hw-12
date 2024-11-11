export function createGalleryCard(image) {
  return `
    <div class="gallery-item">
      <a class="gallery-link" href="${image.largeImageURL}">  
        <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" loading="lazy"/>
        <div class="image-info">
          <p class="info"><b>Likes</b> ${image.likes}</p>
          <p class="info"><b>Views</b> ${image.views}</p>
          <p class="info"><b>Comments</b> ${image.comments}</p>
          <p class="info"><b>Downloads</b> ${image.downloads}</p>
        </div>
      </a>
    </div>
  `;
}

export function showLoadMoreButton() {
  const loadMoreBtn = document.querySelector('#load-more');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = 'block';
  }
}

export function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('#load-more');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = 'none';
  }
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'block';
  }
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'none';
  }
}
