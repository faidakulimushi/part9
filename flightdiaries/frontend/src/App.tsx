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
  visibility: string;
  weather: string;
  comment: string;
}

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: '',
    visibility: 'good',
    weather: 'sunny',
    comment: '',
  });

  const [error, setError] = useState<string | null>(null);

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

    setError(null);

    try {
      const response = await fetch('/api/diaries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Something went wrong');
        return;
      }

      const diary = (await response.json()) as DiaryEntry;

      setDiaries((prevDiaries) => [...prevDiaries, diary]);

      setNewEntry({
        date: '',
        visibility: 'good',
        weather: 'sunny',
        comment: '',
      });
    } catch {
      setError('Unable to connect to the backend');
    }
  };

  return (
    <div>
      <h1>Flight Diaries</h1>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <h2>Add new entry</h2>

      <form onSubmit={addDiary}>
        <div>
          date
          <input
            type="date"
            value={newEntry.date}
            onChange={(event) =>
              setNewEntry({
                ...newEntry,
                date: event.target.value,
              })
            }
          />
        </div>

        <div>
          visibility
          <input
            value={newEntry.visibility}
            onChange={(event) =>
              setNewEntry({
                ...newEntry,
                visibility: event.target.value,
              })
            }
          />
        </div>

        <div>
          weather
          <input
            value={newEntry.weather}
            onChange={(event) =>
              setNewEntry({
                ...newEntry,
                weather: event.target.value,
              })
            }
          />
        </div>

        <div>
          comment
          <input
            value={newEntry.comment}
            onChange={(event) =>
              setNewEntry({
                ...newEntry,
                comment: event.target.value,
              })
            }
          />
        </div>

        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>

      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
          <p>comment: {diary.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default App;