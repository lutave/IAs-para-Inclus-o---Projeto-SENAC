// ====== SISTEMA DE VOZ ======
const botaoVoz = document.getElementById('voz-btn');

// Função que fala um texto
function falarTexto(texto) {
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = 'pt-BR';
  fala.rate = 1;
  fala.pitch = 1;
  speechSynthesis.cancel();
  speechSynthesis.speak(fala);
}

// Botão principal de leitura
botaoVoz.addEventListener('click', () => {
  const texto = document.querySelector('.aba.ativa').innerText;
  falarTexto(texto);
});

// ====== LEITURA AO CLICAR EM TEXTOS ======
document.querySelectorAll('main h2, main p, main li').forEach(elemento => {
  elemento.addEventListener('click', () => {
    const conteudo = elemento.innerText;
    falarTexto(conteudo);
    elemento.style.background = 'rgba(255,255,255,0.1)';
    setTimeout(() => elemento.style.background = 'transparent', 800);
  });
});

// ====== TROCA DE ABAS ======
const atalhos = document.querySelectorAll('.atalho');
const abas = document.querySelectorAll('.aba');

atalhos.forEach(botao => {
  botao.addEventListener('click', () => {
    abas.forEach(aba => aba.classList.remove('ativa'));
    atalhos.forEach(a => a.classList.remove('ativo'));
    document.getElementById(botao.dataset.aba).classList.add('ativa');
    botao.classList.add('ativo');
    document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
  });
});

// ====== QR CODE ======
window.addEventListener('DOMContentLoaded', () => {
  const result = document.getElementById('qrcode-result');
  const downloadBtn = document.getElementById('download-btn');
  const siteURL = "https://seudominio.com/projeto-inclutech"; // Troque pelo link real

  const qrcode = new QRCode(result, {
    text: siteURL,
    width: 250,
    height: 250,
    colorDark: "#ffffff",
    colorLight: "#000000",
    correctLevel: QRCode.CorrectLevel.H
  });

  // Habilitar download
  setTimeout(() => {
    downloadBtn.disabled = false;
  }, 500);

  downloadBtn.addEventListener('click', () => {
    const canvas = result.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'qrcode-inclutech.png';
    link.click();
  });
});

