import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './style.css';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
const { selectEl, loader, errorEl, catInfo } = refs;

loader.classList.replace('loader', 'is-hidden');
errorEl.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

console.dir(errorEl);

updateSelect();

function updateSelect(data) {
  fetchBreeds(data)
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');

      let createSelectEl = data.map(({ name, id }) => {
        return `<option value="${id}">${name}</option>`;
      });
      selectEl.insertAdjacentHTML('beforeend', createSelectEl);

      new SlimSelect({
        select: selectEl,
      });
    })
    .catch(onError);
}

selectEl.addEventListener('change', onChangeSelect);

function onChangeSelect(event) {
  loader.classList.replace('is-hidden', 'loader');
  selectEl.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');

  const breedId = event.target.value;

  // console.log('breedId:', breedId);

  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');
      selectEl.classList.remove('is-hidden');

      const { url, breeds } = data[0];

      catInfo.innerHTML = `<div class="box-img">
      <img src="${url}" alt="${breeds[0].name}" width=400 />
      </div>
      <div class='box'>
      <h1>${breeds[0].name}</h1>
      <p>${breeds[0].description}</p>
      <p><strong>Temperament:</strong>${breeds[0].temperament}</p>
      </div>`;

      catInfo.classList.remove('is-hidden');
    })
    .catch(onError);
}
function onError() {
  loader.classList.replace('loader', 'is-hidden');
  selectEl.classList.remove('is-hidden');

  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}
