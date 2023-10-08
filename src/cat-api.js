// import axios from 'axios';
// axios.defaults.headers.common['x-api-key'] =
//   'live_0WOFEAEoCf5hcRRzqNujEbC1vO0z01lukexemHRNRkp0tnkbzaVvxRmO0CJ8T2ZW';

const URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_0WOFEAEoCf5hcRRzqNujEbC1vO0z01lukexemHRNRkp0tnkbzaVvxRmO0CJ8T2ZW';

export function fetchBreeds() {
  return fetch(`${URL}/breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
