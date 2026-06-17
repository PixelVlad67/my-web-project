console.log("JS connected!");

const themeBtn = document.querySelector('#theme-toggle');
const bodyElement = document.body;

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-theme');
  });
}

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

let allPosts = []; // Змінна для зберігання всіх завантажених постів з сервера
const container = document.querySelector('#posts-container');
const searchInput = document.querySelector('#search-input');

async function loadPosts() {
  const loading = document.querySelector('#loading');
  if (!loading) return;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new Error('Помилка сервера');
    }

    const data = await response.json();
    
    allPosts = data.slice(0, 10);

    renderPosts(allPosts);

    loading.style.display = 'none';

  } catch (error) {
    console.error(error);
    loading.textContent = 'Помилка завантаження';
    loading.style.color = 'red';
  }
}

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

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();

    const filtered = allPosts.filter(post =>
      post.title.toLowerCase().includes(value)
    );

    renderPosts(filtered);
  });
}

loadPosts();

let tasks = [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem('tasks');
  if (data) {
    tasks = JSON.parse(data);
  }
}

const taskInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-task');
const taskList = document.querySelector('#task-list');

function renderTasks() {
  if (!taskList) return;
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;

    const btn = document.createElement('button');
    btn.textContent = 'X';

    btn.addEventListener('click', () => {
      tasks.splice(index, 1); 
      saveTasks();            
      renderTasks();          
    });

    li.appendChild(btn);
    taskList.appendChild(li);
  });
}


if (addBtn && taskInput) {
  addBtn.addEventListener('click', () => {
    const value = taskInput.value.trim();

    if (value === '') return;

    tasks.push({ text: value }); 
    saveTasks();                
    renderTasks();              
    taskInput.value = '';        
  });

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addBtn.click();
    }
  });
}

loadTasks();
renderTasks();