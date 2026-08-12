 import { useEffect, useState } from 'react';
import './App.css';

interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

interface NewDiaryEntry {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: '',
    weather: 'sunny',
    visibility: 'great',
    comment: ''
  });

  useEffect(() => {
    const fetchDiaries = async () => {
      const response = await fetch('/api/diaries');
      const data = (await response.json()) as DiaryEntry[];
      setDiaries(data);
    };

    void fetchDiaries();
  }, []);

  const addDiary = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/diaries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEntry)
    });

    if (!response.ok) {
      console.error('Failed to add diary entry');
      return;
    }

    const diary = (await response.json()) as DiaryEntry;

    setDiaries((prevDiaries) => [...prevDiaries, diary]);

    setNewEntry({
      date: '',
      weather: 'sunny',
      visibility: 'great',
      comment: ''
    });
  };

  return (
    <div>
      <h1>Flight Diaries</h1>

      <h2>Add a new diary entry</h2>

      <form onSubmit={addDiary}>
        <div>
          <label>
            Date:{' '}
            <input
              type="date"
              value={newEntry.date}
              onChange={(event) =>
                setNewEntry({
                  ...newEntry,
                  date: event.target.value
                })
              }
            />
          </label>
        </div>

        <div>
          <label>
            Weather:{' '}
            <select
              value={newEntry.weather}
              onChange={(event) =>
                setNewEntry({
                  ...newEntry,
                  weather: event.target.value
                })
              }
            >
              <option value="sunny">sunny</option>
              <option value="rainy">rainy</option>
              <option value="cloudy">cloudy</option>
              <option value="stormy">stormy</option>
              <option value="windy">windy</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Visibility:{' '}
            <select
              value={newEntry.visibility}
              onChange={(event) =>
                setNewEntry({
                  ...newEntry,
                  visibility: event.target.value
                })
              }
            >
              <option value="great">great</option>
              <option value="good">good</option>
              <option value="ok">ok</option>
              <option value="poor">poor</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Comment:{' '}
            <input
              type="text"
              value={newEntry.comment}
              onChange={(event) =>
                setNewEntry({
                  ...newEntry,
                  comment: event.target.value
                })
              }
            />
          </label>
        </div>

        <button type="submit">Add diary entry</button>
      </form>

      <h2>Diary entries</h2>

      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>

          {diary.comment && <p>Comment: {diary.comment}</p>}
        </div>
      ))}
    </div>
  );
};

export default App;