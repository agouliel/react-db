import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const BASE_API_URL = 'http://localhost:5001/flask/api/songs';

  const [songs, setSongs] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(BASE_API_URL);
      if (response.ok) {
        const results = await response.json();
        setSongs(results.data);
      }
      else {
        setSongs(null);
      }
    })();
  }, []);

  return (
    <List list={songs}/>
  )
}

const List = ({ list }) => (
  <ul>
    {list.map(
      (item) => (<Item key={item.sid} item={item}/>)
    )}
  </ul>
)

const Item = ({ item }) => (
  <li>
    <span>{item.title}</span>-
    <span>{item.artist}</span>
  </li>
)

export default App
