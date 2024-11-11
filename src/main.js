import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api';
import {
  createGalleryCard,
  showLoadMoreButton,
  hideLoadMoreButton,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.input-container');
const input = document.querySelector('.input');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('#load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function handleSearch(event) {
  event.preventDefault();
  const searchQuery = input.value.trim();

  if (searchQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter search query',
    });
    return;
  }

  currentPage = 1;
  currentQuery = searchQuery;
  gallery.innerHTML = '';
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await fetchImages(searchQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    const html = data.hits.map(hit => createGalleryCard(hit)).join('');
    gallery.innerHTML = html;
    simpleLightBox.refresh();

    if (data.hits.length < totalHits) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message:
        'An error occurred while fetching images. Please try again later!',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
}

async function loadMore() {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    const html = data.hits.map(hit => createGalleryCard(hit)).join('');
    gallery.insertAdjacentHTML('beforeend', html);
    simpleLightBox.refresh();

    const { height: cardHeight } =
      gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const totalLoadedImages = currentPage * 15;
    if (totalLoadedImages >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message:
        'An error occurred while loading more images. Please try again later!',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
}

form.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', loadMore);
