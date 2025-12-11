import { useEffect } from 'react';
import NxWelcome from './nx-welcome';

export function App() {
  const fetchData = async () => {
    const res = await fetch('/api', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log('data', data);
    console.log(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p></p>

      <p className="text-lg text-red-600">Welcome to pubg mobile zamn</p>
      <NxWelcome title="@monorepo-test/frontend" />
    </div>
  );
}

export default App;
