let input = document.querySelector('#kqInput');
let output = document.querySelector('#output');
let grams = document.querySelector('#gramsOutput');
let pound = document.querySelector('#pOutput');
let ounce = document.querySelector('#ozOutput');

input.addEventListener('input', (e) => {
  let kg = input.value;
  if (kg != '') {
    output.style.display = 'block';
    grams.innerHTML = kg * 1000;
    pound.innerHTML = Math.round(kg * 2.20462262185);
    ounce.innerHTML = Math.round(kg * 35.27396195);
  } else {
    output.style.display = 'none';
  }
});
