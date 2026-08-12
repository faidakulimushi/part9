 import { useEffect, useState, type FormEvent } from 'react';
import './App.css';

type Visibility = 'great' | 'good' | 'ok' | 'poor';
type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';

interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

interface NewDiaryEntry {
  date: string;
  visibility: Visibility;
  weather: Weather;
  comment: string;
}

const visibilityOptions: Visibility[] = ['great', 'good', 'ok', 'poor'];

const weatherOptions: Weather[] = [
  'sunny',
  'rainy',
  'cloudy',
  'stormy',
  'windy',
];

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

  const addDiary = async (event: FormEvent) => {
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
          {visibilityOptions.map((visibilityOption) => (
            <label key={visibilityOption}>
              {visibilityOption}
              <input
                type="radio"
                name="visibility"
                value={visibilityOption}
                checked={newEntry.visibility === visibilityOption}
                onChange={() =>
                  setNewEntry({
                    ...newEntry,
                    visibility: visibilityOption,
                  })
                }
              />
            </label>
          ))}
        </div>

        <div>
          weather
          {weatherOptions.map((weatherOption) => (
            <label key={weatherOption}>
              {weatherOption}
              <input
                type="radio"
                name="weather"
                value={weatherOption}
                checked={newEntry.weather === weatherOption}
                onChange={() =>
                  setNewEntry({
                    ...newEntry,
                    weather: weatherOption,
                  })
                }
              />
            </label>
          ))}
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