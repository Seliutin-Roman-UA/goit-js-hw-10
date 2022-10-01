import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import Debounce from 'lodash.debounce';
import { markUp } from './markup';

const DEBOUNCE_DELAY = 300;
const inputField = document.querySelector('#search-box');

function handelerInput() {
  const searchString = inputField.value.trim();
  if (searchString === '') {
    markUp([]);
    return;
  }
  fetchCountries(searchString)
    .then(data => {
      markUp(data);
    })
    .catch(error => {
      console.log('Oops, there is no country with that name ', error);
      Notify.failure('Oops, there is no country with that name ');
    });
}

inputField.addEventListener('input', Debounce(handelerInput, DEBOUNCE_DELAY));
