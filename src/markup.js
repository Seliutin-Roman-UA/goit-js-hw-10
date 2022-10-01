import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export function markUp(arrayOfCountries) {
  const listOfCountry = document.querySelector('.country-list');
  const infoAboutCountry = document.querySelector('.country-info');

  function clearHTML() {
    listOfCountry.innerHTML = '';
    infoAboutCountry.innerHTML = '';
  }

  if (arrayOfCountries.length === 0) {
    clearHTML();
    return;
  }

  if (arrayOfCountries.length > 10) {
    clearHTML();
    console.log('It is so mach countries');
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  if (arrayOfCountries.length === 1) {
    const {
      name: name,
      flag: flag,
      capital: capital,
      population: population,
      languages: languages,
    } = arrayOfCountries[0];
    const languagesInString = languages.map(item => item.name).join(', ');

    clearHTML();

    listOfCountry.innerHTML = '';
    infoAboutCountry.innerHTML = `<div class="country__name"> <img src="${flag}" alt="flag of ${name}" width="30"/>
    <span>${name}</span></div>
    <div class="coutry__otherInfo"> <b>Capital:</b> ${capital} <br> <b>Population:</b> ${population} <br> <b>Languages:</b> ${languagesInString}`;
    return;
  }

  clearHTML();

  const list = [...arrayOfCountries].map(
    ({ name, flag }) => `<li class="country__item" data-country="${name}">
  <img src="${flag}" alt="flag of ${name}" width="30"/>
  <span>${name}</span></li>`
  );

  listOfCountry.innerHTML = list.join('');

  console.log('arrayOfCountries   ', arrayOfCountries);

  [...document.querySelectorAll('.country__item')].map(item =>
    item.addEventListener('click', e => {
      document.querySelector('#search-box').value =
        e.currentTarget.dataset.country;
      fetchCountries(e.currentTarget.dataset.country).then(data => {
        markUp(data);
      });
    })
  );
}



