 import { useEffect, useState } from 'react';
import './App.css';

interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const response = await fetch('/api/diaries');
      const data = (await response.json()) as DiaryEntry[];
      setDiaries(data);
    };

    void fetchDiaries();
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>

      {diaries.map((diary) => (
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
        </div>
      ))}
    </div>
  );
};

export default App;