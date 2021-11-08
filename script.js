const imagens = [
  "bobrossparrot",
  "bobrossparrot",
  "explodyparrot",
  "explodyparrot",
  "fiestaparrot",
  "fiestaparrot",
  "metalparrot",
  "metalparrot",
  "revertitparrot",
  "revertitparrot",
  "tripletsparrot",
  "tripletsparrot",
  "unicornparrot",
  "unicornparrot",
];

let cartasDoJogo = [];
let cartasEmbaralhadas = [];
let nmrCartas = 0;
let cartasSelecionadas = [];
let cartasSelecionadasFrente = [];
let cartasSelecionadasVerso = [];
let contador = 0;
let contadorAcertos = 0;

iniciarJogo();

function iniciarJogo() {
  nmrCartas = prompt("Número de cartas:");

  if (nmrCartas < 4 || nmrCartas > 14 || nmrCartas % 2 !== 0) {
    iniciarJogo();
  } else {
    selecionarCartas();
    adicionarCartas();
  }
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function selecionarCartas() {
  for (let i = 0; i < nmrCartas; i++) {
    cartasDoJogo.push(imagens[i]);
  }

  cartasEmbaralhadas = shuffleArray(cartasDoJogo);
}

function adicionarCartas() {
  const cartasJogo = document.querySelector(".cartas");

  for (let i = 0; i < nmrCartas; i++) {
    cartasJogo.innerHTML += `<div class="carta" onclick="virarCarta(this)" data-identifier="card">
    <div class="face frente" data-identifier="front-face">
      <img src="assets/front.png" alt="Parrot" />
    </div>
    <div class="face verso" data-identifier="back-face">
      <img src="assets/${cartasEmbaralhadas[i]}.gif" alt="${cartasEmbaralhadas[i]}" />
    </div>
  </div>`;
  }
}

function virarCarta(virar) {
  const virarF = virar.querySelector(".frente");
  virarF.classList.add("virarFrente");
  const virarV = virar.querySelector(".verso");
  virarV.classList.add("virarVerso");

  cartasSelecionadas.push(virar.innerHTML);
  cartasSelecionadasFrente.push(virar.querySelector(".frente"));
  cartasSelecionadasVerso.push(virar.querySelector(".verso"));

  if (cartasSelecionadas.length === 2) {
    if (cartasSelecionadas[0] === cartasSelecionadas[1]) {
      cartasSelecionadas = [];
      cartasSelecionadasFrente = [];
      cartasSelecionadasVerso = [];
      contador++;
      contadorAcertos++;
    }
    if (cartasSelecionadas[0] !== cartasSelecionadas[1]) {
      setTimeout(desvirar, 1000);

      contador++;
    }
    if (contadorAcertos === nmrCartas / 2) {
      alert(`Você ganhou em ${contador * 2} jogadas!`);
    }
  }

  function desvirar() {
    cartasSelecionadasFrente[0].classList.remove("virarFrente");
    cartasSelecionadasFrente[1].classList.remove("virarFrente");
    cartasSelecionadasVerso[0].classList.remove("virarVerso");
    cartasSelecionadasVerso[1].classList.remove("virarVerso");

    cartasSelecionadas = [];
    cartasSelecionadasFrente = [];
    cartasSelecionadasVerso = [];
  }
}
