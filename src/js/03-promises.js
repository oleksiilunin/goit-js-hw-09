import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
// const buttonEl = document.querySelector('form button[type="submit"]');

formEl.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  // buttonEl.disabled = true;

  const elements = evt.currentTarget.elements;
  console.log(elements);

  const amount = Number(elements.amount.value);
  const step = Number(elements.step.value);
  let delay = Number(elements.delay.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(success => {
        Notiflix.Notify.success(success);
        console.log(success);
      })
      .catch(error => {
        Notiflix.Notify.failure(error);
        console.log(error);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`); // Fulfill
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`); // Reject
      }
    }, delay);
  });
}
