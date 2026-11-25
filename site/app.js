const parts = {
  bocal: ['Bocal', 'É por aqui que o aerossol entra na boca. Ao inalar, partículas finas podem alcançar regiões profundas dos pulmões. O aerossol também pode carregar nicotina e metais, como níquel e chumbo.'],
  liquido: ['Reservatório', 'O líquido pode conter glicerina, propilenoglicol, aromatizantes e nicotina. A composição varia de um produto para outro.'],
  resistencia: ['Resistência', 'A bateria fornece energia à resistência, que aquece o líquido. O aquecimento forma o aerossol, uma mistura de partículas e gotículas suspensas no ar.']
};
const pins = document.querySelectorAll('[data-part]');
const panel = document.querySelector('#part-text');
function selectPart(key) {
  const [title, body] = parts[key];
  panel.querySelector('h3').textContent = title;
  panel.querySelector('p').textContent = body;
  pins.forEach(pin => pin.setAttribute('aria-pressed', String(pin.dataset.part === key)));
}
pins.forEach(pin => pin.addEventListener('click', () => selectPart(pin.dataset.part)));
selectPart('liquido');

const responses = {
  doce: 'O sabor vem dos aromatizantes. Ele não revela a quantidade de nicotina. Repare que o anúncio só fala do gosto.',
  incerto: 'Isso mesmo. O post fala do sabor e deixa de fora a composição. Ver o mesmo produto no feed e entre colegas pode fazer o uso parecer comum.'
};
const answers = document.querySelectorAll('[data-answer]');
answers.forEach(choice => choice.addEventListener('click', () => {
  answers.forEach(button => button.setAttribute('aria-pressed', String(button === choice)));
  document.querySelector('#feedback').textContent = responses[choice.dataset.answer];
}));

function openSupportLink() {
  const target = document.getElementById(location.hash.slice(1));
  if (target?.matches('.support details')) target.open = true;
}
document.querySelector('a[href="#parar"]').addEventListener('click', () => {
  document.getElementById('parar').open = true;
});
window.addEventListener('hashchange', openSupportLink);
openSupportLink();
