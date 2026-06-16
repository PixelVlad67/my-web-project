console.log("JS connected!");

// === РОБОТА З ДАНИМИ ===
const myProjects = [
  { id: 1, title: "Сайт-візитка", tech: "HTML/CSS" },
  { id: 2, title: "Магазин", tech: "JavaScript" }
];

console.log(myProjects[0].title);

const list = document.querySelector('#projects-list');
if (list) {
  myProjects.forEach(project => {
    const li = document.createElement('li');
    li.textContent = project.title + " (" + project.tech + ")";
    list.appendChild(li);
  });
}

// === ПЕРЕМИКАЧ ТЕМИ ===
const themeBtn = document.querySelector('#theme-toggle');
const bodyElement = document.body;

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-theme');
  });
}

// === МОДАЛЬНЕ ВІКНО ТА ФОРМА ===
const openBtn = document.querySelector('#open-modal');
const closeBtn = document.querySelector('#close-modal');
const modal = document.querySelector('#modal');

// Відкриття та закриття по кліку
if (openBtn && closeBtn && modal) {
  openBtn.addEventListener('click', () => {
    modal.classList.add('is-open');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-open');
  });
}

// Закриття по клавіші Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modal.classList.remove('is-open');
  }
});

// Валідація форми
const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#user-name');

if (form && nameInput) {
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Зупиняє перезавантаження сторінки

    if (nameInput.value.trim().length < 2) {
      alert("Ім'я має містити щонайменше 2 символи");
    } else {
      alert("Форму відправлено!");
    }
  });
}