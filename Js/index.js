const toggle = document.getElementById('floating-toggle');
const menu = document.getElementById('floating-menu');
const img = toggle.querySelector('img');

let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let movedEnough = false;
const DRAG_THRESHOLD = 5;

// Impede drag nativo da imagem
img.addEventListener('dragstart', (e) => e.preventDefault());

// Clique para abrir/fechar o menu (se não for arrasto)
toggle.addEventListener('click', () => {
  if (!movedEnough) {
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      openMenu();
    }
  }
});

// Início do arrasto
toggle.addEventListener('mousedown', (e) => {
  isDragging = true;
  movedEnough = false;
  offsetX = e.clientX - toggle.getBoundingClientRect().left;
  offsetY = e.clientY - toggle.getBoundingClientRect().top;

  e.preventDefault();
});

// Durante o arrasto
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const deltaX = Math.abs(e.clientX - (toggle.getBoundingClientRect().left + offsetX));
  const deltaY = Math.abs(e.clientY - (toggle.getBoundingClientRect().top + offsetY));

  if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
    movedEnough = true;
  }

  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;

  // Limites da tela para toggle
  const maxX = window.innerWidth - toggle.offsetWidth;
  const maxY = window.innerHeight - toggle.offsetHeight;
  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  toggle.style.left = `${x}px`;
  toggle.style.top = `${y}px`;

  // Move o menu junto se estiver visível
  if (menu.style.display === 'block') {
    positionMenuRelativeToToggle(x, y);
  }
});

// Soltar o arrasto
document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Posiciona o menu ao lado do botão (direita ou esquerda se não couber)
function positionMenuRelativeToToggle(x, y) {
  const menuWidth = menu.offsetWidth;
  const toggleWidth = toggle.offsetWidth;
  let left = x + toggleWidth + 10;

  // Se o menu sair da tela à direita, exibe à esquerda
  if (left + menuWidth > window.innerWidth) {
    left = x - menuWidth - 10;
  }

  // Garante que não ultrapasse a tela pela esquerda
  left = Math.max(0, left);

  // Garante que o topo fique visível
  let top = Math.min(y, window.innerHeight - menu.offsetHeight);

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}

// Abre o menu
function openMenu() {
  menu.style.display = 'block';

  const toggleRect = toggle.getBoundingClientRect();
  positionMenuRelativeToToggle(toggleRect.left, toggleRect.top);
}

// Reposiciona elementos se a janela for redimensionada
window.addEventListener('resize', () => {
  const toggleRect = toggle.getBoundingClientRect();
  let x = toggleRect.left;
  let y = toggleRect.top;

  // Verifica se está fora da nova viewport
  const maxX = window.innerWidth - toggle.offsetWidth;
  const maxY = window.innerHeight - toggle.offsetHeight;

  if (x > maxX) x = maxX;
  if (y > maxY) y = maxY;

  toggle.style.left = `${x}px`;
  toggle.style.top = `${y}px`;

  if (menu.style.display === 'block') {
    positionMenuRelativeToToggle(x, y);
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const logoImg = document.getElementById("profile-img");

  if (logoImg) {
    let isOriginal = true;
    const originalSrc = "/logow.png"; // ajuste se estiver em /images/
    const alternateSrc = "/doguinho.jpg"; // ajuste se estiver em /images/

    logoImg.addEventListener("click", () => {
      // Apaga suavemente
      logoImg.style.opacity = "0";

      // Troca a imagem após o fade-out
      setTimeout(() => {
        logoImg.src = isOriginal ? alternateSrc : originalSrc;
        isOriginal = !isOriginal;
        logoImg.style.opacity = "1"; // Volta com fade-in
      }, 400); // Tempo deve coincidir com o tempo do CSS (0.3s)
    });
  }
});


// Fecha o menu automaticamente ao redimensionar a janela
window.addEventListener('resize', () => {
  const toggleVisible = window.getComputedStyle(document.getElementById('floating-toggle')).display !== 'none';
  const menu = document.getElementById('floating-menu');

  if (!toggleVisible && menu.style.display === 'block') {
    menu.style.display = 'none';
  }
});

