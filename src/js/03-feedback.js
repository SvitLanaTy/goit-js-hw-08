import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector(`.feedback-form`);

form.addEventListener(`input`, throttle(onFormInput, 500));
form.addEventListener(`submit`, onFormSubmit);

const { email, message } = form.elements;

let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

if (data) {
  email.value = data.email || '';
  message.value = data.message || '';
}

function onFormInput() {
  data = { email: email.value.trim(), message: message.value.trim() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function onFormSubmit(e) {
  e.preventDefault();
  if (email.value.trim() === '' || message.value.trim() === '') {
    return alert('Всі поля повинні бути заповнені!');
  }
  console.log({ email: email.value.trim(), message: message.value.trim() });
  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  data = {};
}
