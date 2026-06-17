console.log("JS connected!");

// ==========================================
// 1. ПЕРЕМИКАЧ ТЕМИ
// ==========================================
const themeBtn = document.querySelector('#theme-toggle');
const bodyElement = document.body;

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-theme');
  });
}

// ==========================================
// 2. МОДАЛЬНЕ ВІКНО ТА ФОРМА
// ==========================================
const openBtn = document.querySelector('#open-modal');
const closeBtn = document.querySelector('#close-modal');
const modal = document.querySelector('#modal');

if (openBtn && closeBtn && modal) {
  openBtn.addEventListener('click', () => {
    modal.classList.add('is-open');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-open');
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modal.classList.remove('is-open');
  }
});

const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#user-name');

if (form && nameInput) {
  form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    if (nameInput.value.trim().length < 2) {
      alert("Ім'я має містити щонайменше 2 символи");
    } else {
      alert("Форму відправлено!");
    }
  });
}

// ==========================================
// 3. ФІНАЛЬНИЙ МІНІ-ЗАСТОСУНОК (API + РЕНДЕР + ПОШУК)
// ==========================================
let allPosts = []; // Змінна для зберігання всіх завантажених постів з сервера
const container = document.querySelector('#posts-container');
const searchInput = document.querySelector('#search-input');

// Функція завантаження постів з API
async function loadPosts() {
  const loading = document.querySelector('#loading');
  if (!loading) return;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new Error('Помилка сервера');
    }

    const data = await response.json();
    
    // Зберігаємо перші 10 постів
    allPosts = data.slice(0, 10);

    // Малюємо їх на екрані
    renderPosts(allPosts);

    // Ховаємо напис "Завантаження..."
    loading.style.display = 'none';

  } catch (error) {
    console.error(error);
    loading.textContent = 'Помилка завантаження';
    loading.style.color = 'red';
  }
}

// Функція відображення карток
function renderPosts(list) {
  if (!container) return;

  const html = list
    .map(post => `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
    `)
    .join('');

  container.innerHTML = html;
}

// Обробник пошуку (фільтрує отримані з API пости)
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();

    const filtered = allPosts.filter(post =>
      post.title.toLowerCase().includes(value)
    );

    renderPosts(filtered);
  });
}

// Запуск програми
loadPosts();