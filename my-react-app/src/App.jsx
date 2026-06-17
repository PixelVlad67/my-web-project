import { useState } from 'react';
import ProjectCard from './ProjectCard';

function App() {
  // state для лічильника: count - значення, setCount - функція для зміни
  const [count, setCount] = useState(0);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Моє портфоліо (React)</h1>

      {/* Секція з лічильником (State) */}
      <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#333333', borderRadius: '8px' }}>
        <h2>Лічильник кліків: {count}</h2>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '16px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Збільшити
        </button>
      </section>

      {/* Секція з картками (Props) */}
      <section>
        <h2>Мої проєкти</h2>
        {/* Викликаємо компонент і передаємо йому дані через props */}
        <ProjectCard title="Сайт-візитка" tech="HTML/CSS" />
        <ProjectCard title="Магазин" tech="JavaScript" />
        <ProjectCard title="Todo App" tech="React" />
      </section>
    </div>
  );
}

export default App;