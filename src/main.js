import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImages from './js/pixabay-api';
import createGalleryCard from './js/render-functions';

const input = document.querySelector('.input');
const button = document.querySelector('.button');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

button.addEventListener('click', event => {
  event.preventDefault();
  const inputValue = input.value;
  console.log(inputValue);
  if (inputValue === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter search query',
    });
    return;
  }

  gallery.innerHTML = '';
  loader.style.display = 'block';

  fetchImages(inputValue)
    .then(data => {
      loader.style.display = 'none';
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
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message:
          'An error occured while fetching images. Please try again later!',
      });
      console.log(error);
    });
});
